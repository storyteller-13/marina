---
title: 🧠 IDEA → My Ever-Evolving Omarchy Security Journey
subtitle: Intermediate to Advanced Engineers | Today's Word: Safety · Sicherheit · あんぜん · בְּטִיחוּת
date: 2026; 11; 13
---

> [🎧](https://www.youtube.com/watch?v=bduQfCPSnLQ) *“Love is the desire for the perpetual possession of the good.”* — Plato on *Symposium*

> [🎵](https://www.youtube.com/watch?v=5NckzRLftkU) *"One must still have chaos in oneself to be able to give birth to a dancing star."* — Friedrich Nietzsche on *Thus Spoke Zarathustra*

<br>

![](/blog/assets/ryden.webp)

<br>

:::poem
All that is gold does not glitter,
Not all those who wander are lost;
The old that is strong does not wither,
Deep roots are not reached by the frost.

From the ashes a fire shall be woken,
A light from the shadows shall spring;
Renewed shall be blade that was broken,
The crownless again shall be king.

— Bilbo Baggins
:::

<br>

#### Hello and happy [Friday the 13th](https://www.science.org/doi/10.1126/science.132.3436.1291), my dear anon friend.

#### Today, we'll walk through the steps I take to harden one of my Linux machines: my Omarchy box. I've called this an "ever-evolving" project because, for now, my focus is on establishing the fundamentals. That said, some of these steps came out of rather lengthy debugging sessions (I'm looking at you, [AppArmor](https://wiki.archlinux.org/title/AppArmor) and [Secure Boot](https://en.wikipedia.org/wiki/Secure_Boot)).

#### Security hardening is an ongoing process. There are plenty of additional monitoring mechanisms, forensic inspections, and security tests that I may incorporate into this work over time, alongside new measures as they become available. The source code for this project, along with some of my other opinionated configurations, is maintained in [**this GitHub repository**](https://github.com/future-ai-org/omarchy_stuff).

<br>

:::ps
This work is the result of an ongoing collaboration with all my frontier robot friends.
:::

:::ps
On a quick note, [**this**](https://www.kitp.ucsb.edu/sites/default/files/YM_working_group.pdf) is pretty exciting to me for several reasons. First, this group has close ties to my alma mater, Stony Brook, through its C.N. Yang Theoretical Institute and the Simons Institute. Second, during my PhD, I briefly collaborated with [**Nikita Nekrasov**](https://www.astro.sunysb.edu/steinkirch/#research) on graph-theoretical approaches to mathematical problems that could potentially connect to string theory. He is incredibly smart, and it's awesome to see these folks achieving such solid results with AI. Third, this is [**pretty impressive progress**](https://www.youtube.com/watch?v=sfKc2uoA9pA), and I can't wait for the second half, which tackles the **[mass gap problem](https://en.wikipedia.org/wiki/Yang%E2%80%93Mills_existence_and_mass_gap)**.
:::

<br>

As I go through the material, please remember our rules:

**🤖 If you see a ✨, it means things that are so cool that they need a lil glitter around them.**
**🤖 Just another blog, but not your usual blog: they're living notes that I change as I fancy.**

<br>

---

# 🔒 Inspecting the System: Baseline Security Check

<br>

This section establishes a baseline by reviewing the operating system, firewall configuration, network exposure, security services, failed system services, mandatory access controls, Linux Security Modules, auditing, kernel hardening parameters, network routing, and disk encryption. Each check is explained below.

<br>

## System Information

<br>

This will report detailed information about the kernel, the Linux distribution, and the machine architecture:

```bash
uname -a
cat /etc/os-release | head -10
```

<br>

## Firewall Configuration

<br>

This will report whether the firewall is active, the default incoming and outgoing traffic policy, logging configuration, and any configured firewall rules (through numerical identifiers).

```bash
sudo ufw status verbose
sudo ufw status numbered
```

For a hardened desktop machine, a typical configuration would use:

```
  - Incoming: deny
  - Outgoing: allow
  - Routed: disabled or an appropriately restricted policy.
```

<br>

## Listening Network Ports

<br>

This command inspects network sockets currently listening for incoming connections, with details for the socket protocol, the current socket state, local IP, associated process name and PID, etc.

> `ss` is the modern replacement for the older `netstat` utility and provides information about network sockets and connections.

```bash
sudo ss -lntup
```

The arguments specify what we want to inspect:

- `-l`: listening sockets only.
- `-n`: numerical addresses and port numbers instead of resolving hostnames and service names.
- `-t`: TCP sockets.
- `-u`: UDP sockets.
- `-p`: the processes associated with the sockets, including process names and PIDs when available.

<br>

## System Services

<br>

This command inspects the runtime state of several important system services using `systemctl` (the command-line interface for interacting with [systemd](https://en.wikipedia.org/wiki/Systemd)).

```bash
systemctl is-active \
  ufw.service \
  <YOUR VPN>.VPN.service \
  auditd.service \
  apparmor.service \
  bluetooth.service \
  cups.service \
  avahi-daemon.service \
  docker.service \
  sshd.service
```

The output reports one of the following states:

```
- active: The service is currently running.
- inactive: The service is not currently running.
- failed: The service encountered an error.
- unknown: systemd cannot determine the requested unit's state.
```

<br>

## Enabled Security Services

<br>

This command inspects whether services are configured to start automatically during system initialization.

```bash
systemctl is-enabled \
  ufw.service \
  auditd.service \
  apparmor.service \
  <YOUR VPN>.VPN.service
```

Typical results include:

```
- enabled: Configured to start automatically through systemd.
- disabled: Not configured for automatic startup.
- static: Cannot be enabled directly because the unit is intended to be started through another unit.
- masked: Explicitly prevented from being started.
- indirect: Enabled through another unit or mechanism.
```

<br>

## Failed System Services

<br>

This command inspects systemd for services that have entered a failed state.

```bash
systemctl --failed --no-pager
```

This can reveal:

```
- Security services that failed to start.
- Background processes that crashed.
- Incorrect service configurations.
- Missing dependencies.
- Problems introduced by system updates.
- Hardware or driver-related service failures.
```

<br>

## AppArmor Status

<br>

This command inspects the current state of [AppArmor](https://en.wikipedia.org/wiki/AppArmor), Linux's Mandatory Access Control (MAC) framework.

```bash
sudo aa-status
```

`sudo aa-status` reports information such as:

```
- Whether AppArmor is enabled in the kernel.
- Whether AppArmor profiles are loaded.
- How many profiles are currently loaded.
- How many profiles are enforcing restrictions.
- How many profiles are operating in complain mode.
- Which processes are currently confined by AppArmor.
```

Two particularly important profile modes are:

```
- Enforce mode: Restrictions are actively applied. Unauthorized operations are denied and can be recorded.
- Complain mode: Policy violations are logged, but operations are generally allowed rather than blocked.
```

<br>

## Linux Security Modules

<br>

This command displays the [Linux Security Modules](https://en.wikipedia.org/wiki/Linux_Security_Modules) (LSM) currently active in the kernel's security framework.

```bash
cat /sys/kernel/security/lsm
```

Depending on the kernel configuration, the output may contain entries such as:

```
- capability: Enforces Linux capability-based access controls.
- landlock: Provides application-level sandboxing through unprivileged access-control rules.
- lockdown: Restricts certain kernel operations to protect kernel integrity.
- yama: Provides additional restrictions on process inspection and debugging.
- apparmor: Implements AppArmor mandatory access-control policies.
- bpf: Provides security hooks associated with BPF-based mechanisms, where supported.
```

<br>

## Linux Audit Framework

<br>

This command queries the current status of the [Linux Audit](https://en.wikipedia.org/wiki/Linux_Audit) subsystem.

```bash
sudo auditctl -s
```

`auditctl -s` displays the current audit subsystem status:

```
- enabled: Indicates whether auditing is enabled, disabled, or immutable.
- failure: Defines how the system should react to certain audit subsystem failures.
- pid: PID of the running audit daemon, when applicable.
- rate_limit: Maximum number of audit messages generated per second, if configured.
- backlog_limit: Maximum number of pending audit messages the kernel can queue.
- lost: Number of audit messages lost because they could not be delivered or processed.
- backlog: Number of audit messages currently waiting in the queue.
```

<br>

## Loaded Audit Rules

<br>

This command displays the audit rules currently loaded into the kernel.

```bash
sudo auditctl -l
```

Depending on the configuration, these rules can monitor:

```
- Changes to critical system configuration files.
- Modifications to authentication and authorization files.
- Execution of privileged binaries.
- Changes to user and group databases.
- Access to sensitive directories.
- Container-related system activity.
- Changes to firewall and network configuration.
- Administrative operations performed through privileged interfaces.
```

<br>

## Audit Services and Boot Configuration

<br>

Check whether the audit services are enabled, review the audit configuration, and confirm that the boot parameters do not disable auditing:

```bash
systemctl is-enabled auditd.service audit-rules.service
systemctl status audit-rules.service --no-pager
ls /etc/audit/rules.d/
sudo cat /etc/audit/auditd.conf
sudo grep -RniE 'audit=|audit_backlog_limit|auditd' /etc/default/grub /etc/kernel/cmdline /boot/loader/entries/ /etc/mkinitcpio.conf 2>/dev/null
```

> **Note:** At the start of this review, auditing was disabled and no persistent rules were loaded. We configure a baseline ruleset in the Filesystem section, and we do not enable immutable mode (`-e 2`) until the rules are verified.

<br>

## Kernel Security Parameters

<br>

This command inspects several kernel parameters that influence the security posture of the running Linux kernel.

```bash
sysctl kernel.yama.ptrace_scope
sysctl kernel.kptr_restrict
sysctl kernel.dmesg_restrict
sysctl kernel.unprivileged_bpf_disabled
sysctl kernel.kexec_load_disabled
sysctl kernel.unprivileged_userns_clone
sysctl fs.suid_dumpable
sysctl kernel.core_pattern
cat /sys/kernel/security/lockdown
```

`kernel.unprivileged_userns_clone` should stay enabled, since browser sandboxes and containers depend on it. The lockdown file shows the active mode, where `[none]` means lockdown is off.

<br>

#### Yama Process Inspection Restrictions

This parameter controls restrictions on the `ptrace` system call, which allows one process to inspect and debug another process.

Depending on its configuration:

```
- 0: Traditional ptrace permissions. Processes can potentially inspect other processes owned by the same user, subject to normal permission checks.
- 1: Restricted ptrace. A process generally cannot attach to arbitrary processes belonging to the same user; additional relationship and authorization requirements apply.
- 2: Administrative-only ptrace. Attaching to processes requires the appropriate administrative capability.
- 3: No ptrace attachment. Attaching is disabled, and the restriction cannot be relaxed until reboot.
```

<br>

#### Kernel Pointer Disclosure Restrictions

`sysctl kernel.kptr_restrict` controls the visibility of kernel memory addresses through interfaces that might otherwise expose kernel pointers.

Typical values include:

```
- 0: Kernel pointers are exposed according to the permissions of the relevant interfaces.
- 1: Kernel pointers are hidden from unprivileged users, subject to exceptions for privileged users with the appropriate capabilities.
- 2: Kernel pointers are hidden from all users, including privileged users.
```

<br>

#### Kernel Message Access Restrictions

`kernel.dmesg_restrict` controls access to kernel messages through the `dmesg` interface.

Typical values:

```
- 0: Unprivileged users can generally read kernel messages.
- 1: Reading kernel messages requires the appropriate administrative capability, typically CAP_SYSLOG.
```

<br>

#### Unprivileged BPF Restrictions

`kernel.unprivileged_bpf_disabled` controls whether unprivileged users can load certain BPF ([Berkeley Packet Filter](https://en.wikipedia.org/wiki/Berkeley_Packet_Filter)) programs.

Common values:

```
- 0: Unprivileged BPF is enabled.
- 1: Unprivileged BPF is disabled, and the restriction cannot be reversed until reboot.
- 2: Unprivileged BPF is disabled but can potentially be re-enabled by an appropriately privileged process.
```

<br>

#### Kexec Restrictions

`sysctl kernel.kexec_load_disabled` controls whether the `kexec_load` system call can load a new kernel into memory for execution.

Typical values:

```
- 0: Kernel loading through the relevant kexec interface is permitted, subject to normal permissions.
- 1: The ability to load a new kernel through kexec_load is disabled and cannot be re-enabled until reboot.
```

<br>

## Network Routing

<br>

This command inspects the machine's network routing configuration, including IPv4 and IPv6 policy-routing rules and the route selected for a specific destination.

```bash
ip -4 rule show
ip -6 rule show
ip route get 1.1.1.1
```

<br>

#### IPv4 Policy Routing

`ip -4 rule show` displays the IPv4 routing policy database (RPDB) rules.

The rules can contain:

```
- Priority values.
- Source and destination address selectors.
- Firewall marks.
- Incoming interface selectors.
- Routing table references.
```

<br>

#### IPv6 Policy Routing

`ip -6 rule show` performs the same inspection for IPv6 routing rules.

<br>

#### Route Selection

`ip route get 1.1.1.1` asks the kernel how it would route a packet destined for `1.1.1.1`.

The output typically identifies:

```
- The selected routing table and route.
- The outgoing network interface.
- The selected source IP address.
- The next-hop gateway, when applicable.
```

For example, the result might indicate that traffic should leave through a VPN interface rather than the ordinary wireless or Ethernet interface.

<br>

## Disk Encryption

<br>

This command displays block devices and their associated filesystem information.

```bash
lsblk -f
```

When inspecting an encrypted Linux installation, you may encounter entries such as:

```
- crypto_LUKS: Indicates a LUKS-encrypted block device.
- ext4, btrfs, or xfs: Filesystem types commonly used within decrypted storage volumes.
- crypt: A device-mapper mapping representing an opened encrypted volume.
- vfat: Commonly used for EFI System Partitions.
```

<br>

---

# 🔒 Network: Firewall, Ports, and Protocols

<br>

This section secures how the machine communicates with the outside world: the firewall, open ports and connections, the VPN, IPv6, and unused network protocols.

<br>

## Firewall

<br>

Set the default policies and enable the [UFW](https://en.wikipedia.org/wiki/Uncomplicated_Firewall) firewall:

```bash
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw logging on
sudo ufw enable
```

Then check that it is active:

```
sudo ufw status verbose
```

The output should show:

```
Status: active
Default: deny (incoming), allow (outgoing)
```

> **Note:** Keep the outgoing policy at `allow`. The VPN client must reach its servers through the physical interface, and a restrictive outgoing policy can prevent reconnection. The VPN routing and kill switch provide the fail-closed behavior instead.

Block inbound traffic to a suspicious port:

```bash
sudo ufw deny in PORT-NUMBER-HERE/udp
```

Review the allow rules and remove any you do not recognize. Confirm that nothing uses the port first, then delete the rule for both protocols:

```bash
sudo ufw status numbered
sudo ufw delete allow <PORT>/tcp
sudo ufw delete allow <PORT>/udp
```

<br>

## Ports and Processes

<br>

Install `lsof` (used below to map ports to processes):

```bash
sudo pacman -S lsof
```

Check listening ports:

```bash
sudo ss -tulpn
```

All listening sockets, including process ownership:

```bash
sudo ss -tulpne
```

Listening TCP ports:

```bash
sudo ss -lntp
```

Listening UDP ports:

```bash
sudo ss -lnup
```

Processes listening on network interfaces:

```bash
sudo lsof -i -P -n | grep LISTEN
```

Check active network connections:

```bash
ss -tunap
nmcli connection show --active
```

<br>

> **Note:** Check for DNS listeners that no longer serve a purpose. A leftover `DNSStubListenerExtra` setting can keep `systemd-resolved` listening on an old bridge address, even after the software that needed it has been removed:

```bash
sudo grep -RniE 'DNSStubListenerExtra' /etc/systemd/resolved.conf /etc/systemd/resolved.conf.d/ 2>/dev/null
```

Remove the stale setting only after confirming that nothing uses it. Then restart the resolver and verify that only the loopback listeners remain:

```bash
sudo systemctl restart systemd-resolved
sudo ss -lntup | grep ':53'
```

<br>

## Network Discovery

<br>

Disable unnecessary network discovery (should return `inactive`):

```bash
sudo systemctl disable --now avahi-daemon.service avahi-daemon.socket
systemctl is-active avahi-daemon.service
systemctl is-active avahi-daemon.socket
```

<br>

## NetworkManager and DNS

<br>

Inspect NetworkManager and DNS configuration:

```bash
NetworkManager --print-config
NetworkManager --version
resolvectl status
nmcli connection show
pacman -Qi networkmanager
sudo pacman -Qo /usr/bin/NetworkManager
```

<br>

## IPv6

<br>

If your VPN doesn't support IPv6, disable it to prevent leaks:

```bash
sudo nvim /etc/sysctl.d/70-disable-ipv6.conf
```

with:

```
net.ipv6.conf.all.disable_ipv6 = 1
net.ipv6.conf.default.disable_ipv6 = 1
```

The `all` and `default` values do not prove that every interface is covered. The `all` value applies to interfaces that already exist when it is written, and new interfaces inherit `default`. Check each interface:

```bash
for i in /proc/sys/net/ipv6/conf/*/disable_ipv6; do
    printf "%-20s " "$(basename "$(dirname "$i")")"
    cat "$i"
done
```

For a physical connection, you can also disable IPv6 in its NetworkManager profile, which persists across reconnects:

```bash
sudo nmcli connection modify "<CONNECTION-NAME>" ipv6.method disabled
```

> **Note:** Do not disable IPv6 on the VPN's virtual interfaces without checking the VPN's requirements first. The VPN may use them for its kill switch and routing.

Test IPv4 and IPv6 connectivity:

```bash
curl -4 --connect-timeout 10 https://api.ipify.org
curl -6 --connect-timeout 10 https://api64.ipify.org
```

> **Note:** While IPv6 is disabled, the IPv6 test is expected to fail. An IPv6 route through the VPN does not mean that IPv6 connectivity works.

<br>

## VPN Verification

<br>

Check the VPN service and the active connections:

```bash
systemctl is-active <YOUR VPN>.VPN.service
systemctl is-enabled <YOUR VPN>.VPN.service
nmcli -f NAME,TYPE,DEVICE connection show --active
```

Check IPv4 routing, including the VPN server endpoints and the local gateway:

```bash
ip -4 route get 1.1.1.1
ip -4 route get <VPN-SERVER-IP>
ip -4 route get <LOCAL-GATEWAY-IP>
ip -4 rule show
ip -4 route show table <TABLE-NUMBER>
ip -4 route show table main
```

In a healthy setup, general internet traffic uses the VPN interface. Only the VPN server endpoints use the physical interface, because the tunnel has to reach its server through the local network. The local gateway stays reachable for local network access.

Check DNS, the firewall, and the VPN processes:

```bash
resolvectl status
sudo ufw status verbose
pgrep -a -i vpn
```

Check the routing of marked traffic. The VPN client marks its own traffic with a firewall mark, so marked packets bypass the VPN routing table and use the kill-switch route instead. Use the mark that your VPN client reports:

```bash
ip route get 1.1.1.1
ip route get 1.1.1.1 mark <FWMARK>
ip route show table main
ip -details link show <KILL-SWITCH-INTERFACE>
```

The unmarked route should use the VPN tunnel. The marked route should use the kill-switch interface. The kill-switch interface is a dummy device that carries no traffic of its own. The main table should prefer it over the Wi-Fi default route. The only expected physical-network route is the exception for the VPN server's address.

> **Note:** An application can set the firewall mark on its own sockets, so the mark does not need a matching `iptables` or `nftables` rule. Do not conclude that the routing is unprotected because the mangle and NAT tables are empty.

The VPN routing table should end with an unreachable default route, so traffic that is not tunneled is dropped instead of sent over Wi-Fi.

Check the VPN application's settings before you test:

- **Kill switch:** set to the advanced (permanent) option, so traffic stays blocked when the connection drops.
- **Split tunneling:** disabled, so no application bypasses the tunnel by accident.
- **DNS:** leave NetworkManager on automatic DNS. Do not add third-party DNS servers to the Wi-Fi profile. In Firefox, turn DNS over HTTPS off, so that the system resolver handles lookups through the VPN.

Routing output alone does not prove that the kill switch works. Run a controlled disconnect test:

1Note your current public IPv4 address: `curl -4 --connect-timeout 5 https://api.ipify.org`.
2. Disconnect the VPN in its application. Leave the firewall and the kill switch enabled.
3. Run the same request, and check the route and the kill-switch interface:

```bash
curl -4 --connect-timeout 5 https://api.ipify.org
ip route get 1.1.1.1
ip -br addr show <KILL-SWITCH-INTERFACE>
```

Reconnect the VPN immediately afterward.

Test the disconnected state with the same requests, then reboot and repeat the connected and disconnected checks. Protection must survive a reboot.

Run a monitor in a second terminal before you disconnect. It checks the public address every two seconds and prints BLOCKED when the request fails:

```bash
while true; do
    printf '%s ' "$(date +%H:%M:%S)"
    curl -4 -sS --connect-timeout 2 https://api.ipify.org || echo "BLOCKED"
    sleep 2
done
```

The expected result is that the request fails rather than returning your ISP address. On this system, the test passed. Traffic did not fall back to Wi-Fi during the disconnect. The test covers this one failure scenario, not a reboot, a daemon crash, or an interface change, so verify those separately.

<br>

## Unused Network Protocols

<br>

Check whether the modules are loaded and inspect their metadata:

```bash
for module in dccp sctp rds tipc; do
    echo
    echo "--- $module ---"

    if lsmod | grep -q "^${module}"; then
        echo "LOADED"
    else
        echo "NOT LOADED"
    fi

    modinfo "$module" 2>/dev/null |
        grep -E '^(filename|description|depends):' ||
        echo "MODULE NOT AVAILABLE"
done
```

Check for active sockets and existing module configuration:

```bash
ss -A dccp -a 2>/dev/null
ss -A sctp -a 2>/dev/null

grep -RniE 'dccp|sctp|rds|tipc' \
    /etc/modprobe.d/ /etc/modules-load.d/ 2>/dev/null || true
```

Disable unused network protocol modules (modprobe file):

```bash
sudo tee /etc/modprobe.d/disable-unused-protocols.conf <<'EOF'
# Disable unused network protocols (Lynis NETW-3200)
install sctp /usr/bin/false
install rds /usr/bin/false
install tipc /usr/bin/false
blacklist sctp
blacklist rds
blacklist tipc
EOF
```

Verify the resulting configuration and module behavior:

```bash
cat /etc/modprobe.d/disable-unused-protocols.conf
modprobe -n -v sctp
modprobe -n -v rds
modprobe -n -v tipc
lsmod | grep -E '^(dccp|sctp|rds|tipc)' ||
    echo "All four protocols are unloaded."
```

<br>

## Build Your Own VPN on a VPS

<br>

> **TBA:** This part is still to be added.

A commercial VPN is convenient, but you still have to trust its provider. In this part, we'll set up our own VPN server on a [VPS](https://en.wikipedia.org/wiki/Virtual_private_server) (a small virtual machine rented from a cloud provider) and connect the Omarchy box to it.

<br>

#### Steps

- Choosing a VPS provider and region.
- Creating a hardened VPS (SSH keys, firewall, unattended upgrades).
- Installing and configuring [WireGuard](https://en.wikipedia.org/wiki/WireGuard) on the server.
- Creating client keys and configuring the Omarchy box.
- Routing traffic through the tunnel and checking for DNS and IPv6 leaks.

<br>

## Example: Forensics in Practice

<br>

The following example applies the theory above. It shows how the same tools can be used to trace which process owns an open network socket.

Inspect network interfaces and routes:

```bash
ip -brief address
ip route
```

Inspect the UDP tables and socket ownership:

```bash
sudo cat /proc/net/udp
sudo cat /proc/net/udp6

sudo grep -R "PORT-NUMBER-HERE" /proc/*/net/udp /proc/*/net/udp6 2>/dev/null

sudo ls -l /proc/$(pidof NetworkManager)/fd
```

Replace the inode number in the following command with the one found in the previous output:

```bash
sudo find /proc/[0-9]*/fd \
    -lname 'socket:[INODE-NUMBER-HERE]' 2>/dev/null
```

Inspect network namespaces and NetworkManager service restrictions:

```bash
sudo lsns -t net
sudo readlink /proc/$(pidof NetworkManager)/ns/net
sudo readlink /proc/1/ns/net

systemctl show NetworkManager \
    -p MainPID \
    -p ControlGroup \
    -p PrivateNetwork \
    -p NetworkNamespacePath \
    -p RestrictAddressFamilies
```

Check which process owns a port:

```bash
sudo lsof -i :PORT-NUMBER-HERE
sudo ss -ulpn | grep PORT-NUMBER-HERE
sudo ss -lunp 'sport = :PORT-NUMBER-HERE'
sudo ss -ulpne 'sport = :PORT-NUMBER-HERE'
sudo fuser -v PORT-NUMBER-HERE/udp
```

Search NetworkManager configuration and logs for the port:

```bash
sudo grep -R "PORT-NUMBER-HERE" /etc/NetworkManager /usr/lib/NetworkManager 2>/dev/null

sudo journalctl -u NetworkManager -b --no-pager |
    grep -iE 'dns|dhcp|connectivity|PORT-NUMBER-HERE'
```

<br>

---

# 🔒 Services: Stopping What You Don't Need

<br>

Every running service is a potential entry point. This section reviews what is running, disables what is not needed, and turns off Bluetooth down to the kernel modules.

<br>

## Running Services

<br>

Check running services:

```bash
systemctl list-units --type=service --state=running
```

Check enabled services:

```bash
systemctl list-unit-files --state=enabled
```

Check for processes consuming unusual amounts of CPU:

```bash
ps aux --sort=-%cpu | head -20
```

<br>

Check the user-level services. They run under your account and can execute programs with your privileges:

```bash
systemctl --user list-unit-files --type=service --state=enabled
systemctl --user list-units --type=service --state=running
```

Inspect an unfamiliar service before you disable it. Identify its executable, its definition file, and the user it runs as:

```bash
systemctl --user status <SERVICE>.service --no-pager
systemctl --user cat <SERVICE>.service
systemctl --user show <SERVICE>.service -p ExecStart -p FragmentPath -p User -p MainPID
```

<br>

## Disable Unused Services

<br>

Disable and mask the services that are not required:

```bash
sudo systemctl disable --now cups.service
sudo systemctl disable --now bolt.service
sudo systemctl mask bolt.service
sudo systemctl disable --now docker.socket
sudo systemctl disable --now docker.service

systemctl is-enabled cups.service bolt.service
```

<br>

## Disable Bluetooth Down to the Kernel Modules

<br>

Disable and mask the Bluetooth services:

```bash
sudo systemctl disable --now bluetooth.service
sudo systemctl disable --now bluetooth.socket
sudo systemctl mask bluetooth.service
sudo systemctl mask bluetooth.socket
pacman -Qs blue
```

<br>

Blacklist the Bluetooth kernel modules in a modprobe file:

```
sudo nvim /etc/modprobe.d/disable-bluetooth.conf
```

with:

```
# Disable Bluetooth kernel modules
blacklist bluetooth
blacklist btusb
blacklist btrtl
blacklist btbcm
blacklist btintel
blacklist btmtk
blacklist bnep
blacklist rfcomm
```

Then reboot.

<br>

## Systemd Service Exposure

<br>

Use `systemd-analyze security` to see which sandboxing options a unit uses. A low score is a reason to review the service, not proof that it is vulnerable:

```bash
SYSTEMD_PAGER=cat systemd-analyze security --no-pager <UNIT>.service
systemctl show <UNIT>.service -p User -p NoNewPrivileges -p ProtectSystem -p ProtectHome -p CapabilityBoundingSet
```

Compare what the process could acquire (`CapBnd`) with what it actually uses (`CapEff`) before you restrict anything:

```bash
sudo awk '/^(Name|Uid|CapEff|CapBnd|NoNewPrivs):/' /proc/<PID>/status
```

> **Note:** Do not apply a generic hardening profile to a VPN daemon. It needs network privileges to manage routes and interfaces, and a restriction that breaks tunnel setup or kill-switch recovery can leave the machine unprotected. Make one change at a time, test the VPN after each change, and keep a copy of the original unit so you can restore it.

<br>

---

# 🔒 Kernel: Hardening Runtime Settings

<br>

These settings control how the kernel exposes information and handles risky features. We check the current values, then apply a hardened configuration.

<br>

Inspect kernel security settings:

```bash
sysctl kernel.randomize_va_space
sysctl kernel.kptr_restrict
sysctl kernel.dmesg_restrict
sysctl kernel.unprivileged_bpf_disabled
```

<br>

## Hardening Kernel

<br>

Create the hardening configuration file:

```
sudo nvim /etc/sysctl.d/99-hardening.conf
```

with:

```
# Restrict kernel pointer exposure
kernel.kptr_restrict = 2
# Restrict TTY line discipline autoloading
dev.tty.ldisc_autoload = 0
# Protect FIFOs and regular files in world-writable sticky directories
fs.protected_fifos = 2
fs.protected_regular = 2
# Prevent suid processes from dumping core
fs.suid_dumpable = 0
# Disable kernel module loading after boot (uncomment only if you do not load modules post-boot)
# kernel.modules_disabled = 1
# Restrict Magic SysRq key functions
kernel.sysrq = 0
# Harden BPF Just-In-Time compiler
net.core.bpf_jit_harden = 2
# Log martian packets (packets with impossible routing addresses) on all interfaces
net.ipv4.conf.all.log_martians = 1
net.ipv4.conf.default.log_martians = 1
```

Apply the changes:

```bash
sudo sysctl --system
```

Files in `/etc/sysctl.d/` are applied in order, so a later file overrides an earlier one with the same key.

> **Note:** Optional hardening, such as kernel lockdown and kexec restrictions, can interfere with kernel modules and development workflows, so it is not enabled here.

<br>

## Check Unexpected Kernel Modules

<br>

List the loaded kernel modules and check for unexpected ones:

```bash
lsmod
lsmod | grep -E 'firewire'
```

<br>

---

# 🔒 Access Control: Users, SSH, USB, and Boot Chain

<br>

This section controls who and what can access the system: user privileges, remote SSH logins, Hyprland app permissions, USB and Thunderbolt devices, network authorization, and the boot chain (AppArmor and [Secure Boot](https://en.wikipedia.org/wiki/Secure_Boot)).

<br>

## SSH

<br>

Harden the SSH daemon configuration:

```
sudo nvim /etc/ssh/sshd_config
```

with:

```
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
X11Forwarding no
AllowAgentForwarding no
AllowUsers yourusername
```

or disable SSH entirely:

```bash
sudo systemctl stop sshd
sudo systemctl disable sshd
sudo systemctl stop sshd.socket sshd.service
sudo systemctl disable sshd.socket sshd.service
```

<br>

## Hyprland Permissions

<br>

Confirm the Hyprland packages and open the configuration file:

```
pacman -Q hyprland hyprland-guiutils
sudo nvim ~/.config/hypr/hyprland.lua
```

<br>

Add the following rules to require approval for screen capture, input capture, plugin loading, and cursor tracking:

```lua
-- Screen capture: require approval
hl.permission({
    binary = ".*",
    type = "screencopy",
    mode = "deny"
})

-- Keyboard and mouse input capture: require approval
hl.permission({
    binary = ".*",
    type = "input-capture",
    mode = "deny"
})

-- Plugin loading: require approval
hl.permission({
    binary = ".*",
    type = "plugin",
    mode = "ask"
})

-- Cursor tracking: require approval
hl.permission({
    binary = ".*",
    type = "cursorpos",
    mode = "deny"
})
```

<br>

## Avoid Bad USB

<br>

Install usbguard, generate a policy from the currently connected devices, and enable the daemon:

```bash
sudo pacman -S usbguard
sudo usbguard generate-policy | sudo tee /etc/usbguard/rules.conf > /dev/null
sudo systemctl enable --now usbguard.service
sudo systemctl status usbguard.service
```

<br>

## AppArmor

<br>

> **Note:** AppArmor took me a good amount of debugging time, so I will expand this section in detail in a future post.

Install and enable AppArmor:

```bash
sudo pacman -S apparmor
sudo systemctl enable --now apparmor
```

Verify kernel support:

```bash
zgrep CONFIG_SECURITY_APPARMOR /proc/config.gz
```

Check for profiles that do not confine their applications, and for processes running without confinement:

```bash
sudo grep -l "flags=(unconfined)" /etc/apparmor.d/*
sudo aa-unconfined
```

> **Note:** A profile with `flags=(unconfined)` only gives the application a name; it does not confine it. Proper confinement requires application-specific rules, which we will build and test in a future post.

Check the order in which the Linux Security Modules are initialized. AppArmor should be initialized before BPF, so check the active order and the boot parameters that set it:

```bash
cat /sys/kernel/security/lsm
cat /proc/cmdline
sudo grep -n 'KERNEL_CMDLINE' /etc/default/limine
```

> **Note:** During testing, the active order placed BPF before AppArmor, and the kernel logged `audit: error in audit_log_subj_ctx` while audit rules were loaded. The fix is to place AppArmor before BPF in the kernel parameters. Confirm the active order with `cat /sys/kernel/security/lsm` after reboot.

Review the profiles before changing any of them. Count the profiles in each mode, then list the profiles in complain mode and the unconfined profiles:

```bash
sudo aa-status
sudo aa-status --show=profiles --filter.mode=complain
sudo aa-status --show=profiles --filter.mode=unconfined
apparmor_parser --version
systemctl status apparmor.service --no-pager
```

> **Note:** A profile in enforce mode restricts only the processes that run under it. Check `sudo aa-status --verbose` to see which running processes are confined. A count of enforcing profiles alone does not mean that your applications are protected. Running processes that have a profile but are unconfined are a hardening opportunity.

> **Note:** Complain mode logs violations without blocking them. Unconfined profiles have no effective confinement. On this version of `aa-status`, the `--unconfined` option is not available, so use the `--filter.mode` filter instead.

Prioritize the review. Start with browsers, password managers, and other network-facing applications, then development tools, terminals, and AI agents, then desktop services. Do not switch a profile to enforce mode until you know which files, processes, and network access the application needs. An incorrect profile can break a workflow without making the system meaningfully safer.

## Profile Findings

<br>

Before changing a profile, inspect it, its package owner, and any local overrides:

```bash
sudo grep -nE '^[[:space:]]*profile[[:space:]]' /etc/apparmor.d/<PROFILE>
pacman -Qo /etc/apparmor.d/<PROFILE>
sudo ls -la /etc/apparmor.d/local/
sudo aa-status --show=profiles --filter.profiles=<PROFILE>
```

The findings on this system are:

- **Transmission:** four profiles are in complain mode, but Transmission is not installed or running. They stay unchanged.
- **Discord, Slack, Element, and MongoDB Compass:** their profiles are unconfined, and the applications are not installed. Their package-owned files stay unchanged.
- **1Password:** the profile is deliberately unconfined, and there are no local overrides. Eight running processes have the profile but are unconfined. A generic policy could break desktop access, browser integration, or vault access, so the profile stays unchanged until a tested policy exists.
- **Brave and Firefox:** both are installed and running, and both profiles are unconfined. They are the next candidates, and we will test one browser at a time.

> **Note:** Profiles owned by the `apparmor` package are replaced during updates. Put site-specific changes in `/etc/apparmor.d/local/` instead.

<br>

## Secure Boot

<br>

> Set a BIOS/UEFI password and enable Secure Boot.

> **Note:** We will go over the details of how to set up Secure Boot in a future post. It is very important because it makes sure only trusted, signed boot code runs, which protects the system from bootkits and tampered bootloaders. It also takes a little time to get right, so we'll take it step by step.

<br>

Check the boot chain integrity:

```bash
sudo pacman -S sbctl
sudo sbctl status
```

Verify the EFI binaries:

```bash
sudo sbctl verify
```

> **Important:** Back up your existing UEFI keys before you enroll your own keys. Do not replace firmware keys or enable Secure Boot until you have verified that every boot component is signed.

Inspect bootloader and kernel parameters:

```bash
bootctl status
cat /proc/cmdline
```

Update the Limine configuration:

```bash
sudo limine-update
```

<br>

## Privilege Escalation

<br>

An attacker who compromises a normal user account will look for a way to root. The most common paths are sudo rules, SUID and SGID binaries, and file capabilities. Review each one before changing anything.

Check the root accounts, the sudo rules, and the privileged groups:

```bash
getent passwd | awk -F: '$3 == 0 {print $1, $3, $6, $7}'
awk -F: '$3 >= 1000 {print $1}' /etc/passwd
sudo -l
sudo grep -RInE '^[[:space:]]*[^#].*' /etc/sudoers /etc/sudoers.d/ 2>/dev/null
getent group wheel adm disk
sudo visudo -c
```

List the SUID and SGID binaries, and the file capabilities:

```bash
sudo find /usr/bin /usr/sbin /bin /sbin /usr/local/bin -xdev -type f -perm /6000 -printf '%m %u:%g %p\n' 2>/dev/null | sort
sudo getcap -r /usr/bin /usr/sbin /usr/local/bin /opt 2>/dev/null
```

For each entry, confirm the owning package and its purpose:

```bash
stat -c '%A %a %U:%G %n' /usr/bin/<BINARY>
pacman -Qo /usr/bin/<BINARY>
getcap -v /usr/bin/<BINARY>
```

Findings on this system:

- **Root accounts:** only `root` has UID 0. The regular user is in `wheel`, and the `disk` group is empty, and `adm` contains only the system `daemon` user. Sudo rules validate without errors.
- **Sudo:** the user has full sudo access, which is expected on a single-user workstation. Credentials stay cached for ten minutes (`timestamp_timeout=10`). The Omarchy `NOPASSWD` entries are limited to specific commands and should be reviewed periodically.
- **`gpu-screen-recorder`:** `gsr-kms-server` has `cap_sys_admin`, which allows monitor capture without a password prompt. Keep it only if you use direct monitor capture.
- **`btop`:** `cap_dac_read_search` and `cap_perfmon` enable CPU wattage and GPU monitoring. Keep them while `show_cpu_watts` is enabled.
- **`inetutils`:** the legacy `rcp`, `rlogin`, and `rsh` clients have `cap_net_bind_service`, but they are not used here. The package is removed in the Applications section.
- **Root password:** `root` has a password set, and SSH is disabled and inactive. Consider locking direct root password login only after you have confirmed a recovery path.
- **Other SUID binaries:** each one belongs to a recognizable package, such as `pkexec` (Polkit), `mount.cifs`, `nvidia-modprobe`, and `ksu`. They stay in place for now.

> **Note:** Remove a capability or an SUID bit only after you identify the package's purpose. Some of them are required for hardware and monitoring features.

<br>

## NetworkManager Authorization

<br>

NetworkManager lets users change network settings through Polkit. Check the vendor policy, the distribution rules, and the connection permissions before changing anything:

```bash
sudo grep -RInE 'settings\.modify\.system|auth_admin|auth_self|allow_active|allow_inactive' /usr/share/polkit-1/actions/org.freedesktop.NetworkManager.policy
sudo cat /usr/share/polkit-1/rules.d/org.freedesktop.NetworkManager.rules
ls -la /etc/polkit-1/rules.d/
pkaction --action-id org.freedesktop.NetworkManager.settings.modify.system --verbose
nmcli -g connection.permissions connection show "<CONNECTION-NAME>"
```

The vendor policy requires administrator authentication for system-wide connection changes. A distribution rule file can override that default, and it should be checked for any unconditional grant to the `wheel` group. Connections restricted to one user, such as a VPN profile, are not affected by a system-wide grant.

To require administrator authentication without changing the vendor files, add a local rule. Polkit evaluates rule files in filename order, and the first rule that returns a result wins. `AUTH_ADMIN` requires administrator authentication without the temporary caching of `AUTH_ADMIN_KEEP`:

```bash
sudo tee /etc/polkit-1/rules.d/00-networkmanager-auth.rules > /dev/null <<'EOF'
polkit.addRule(function(action, subject) {
    if (action.id === "org.freedesktop.NetworkManager.settings.modify.system") {
        return polkit.Result.AUTH_ADMIN;
    }
});
EOF
```

Verify the file permissions, the service, and any rule errors in the log:

```bash
sudo stat -c '%A %a %U:%G %n' /etc/polkit-1/rules.d/00-networkmanager-auth.rules
systemctl is-active polkit.service
sudo journalctl -u polkit.service -b --no-pager | grep -iE 'error|exception|syntax|rule|failed' || true
```

> **Note:** This rule changes only system-wide connection authorization. It does not change VPN routing, autoconnect, or the kill-switch configuration. Test a controlled authorization request before relying on it, and confirm that the file is `644 root:root` and that the log shows no rule errors.

<br>

## Thunderbolt Authorization

<br>

Thunderbolt devices can expose high-speed, DMA-capable interfaces, so their authorization is a meaningful security boundary. The Bolt package ships a Polkit rule that returns `YES` for active local `wheel` members, which skips administrator authentication for authorizing, enrolling, and managing Thunderbolt devices. Check the rule, the daemon, and the hardware before deciding:

```bash
sudo cat /usr/share/polkit-1/rules.d/org.freedesktop.bolt.rules
pkaction --action-id org.freedesktop.bolt.authorize --verbose
systemctl status bolt.service --no-pager
pacman -Qi bolt | grep -E '^(Name|Version|Install Reason)'
lspci -nn | grep -i thunderbolt || true
```

On this system, the Thunderbolt controller is present and the Bolt daemon is running. Since no Thunderbolt peripherals are used, the package is removed, which also removes its `wheel` rule:

```bash
sudo pacman -Rns bolt
```

Review the removal list before you confirm it. Do not force the removal. Verify the result:

```bash
pacman -Q bolt 2>&1
ls -l /usr/share/polkit-1/rules.d/*bolt* 2>&1
pgrep -a boltd || echo "No Bolt daemon running"
```

Removing a package does not stop a process that is already running. If `boltd` is still running after the removal, stop it by its process ID:

```bash
pgrep -x boltd
sudo kill -TERM <PID>
```

> **Note:** Removing the package removes the Thunderbolt user daemon, not the Thunderbolt hardware or its kernel drivers. USB-C and ordinary USB devices keep working. If you later need Thunderbolt docks or eGPUs, reinstall Bolt and replace its `wheel` rule with administrator authentication instead of restoring the exception.

<br>

---

# 🔒 Applications: Updates and Removing Unused Software

<br>

Outdated and unused software widens the attack surface. This section keeps the system updated and removes packages that are not needed.

<br>

## System Updates

<br>

Keep the system updated:

```bash
omarchy-update
sudo pacman -Syu
```

<br>

## Flatpak

<br>

Use `flatpak` to run desktop applications in a sandbox:

```bash
sudo pacman -S flatpak
flatpak list
```

<br>

## Remove Unused Applications

<br>

Remove the packages that are not needed:

```bash
sudo pacman -Rns \
  cups \
  cups-filters \
  cups-pk-helper \
  python-pycups \
  avahi \
  inetutils \
  bolt \
  chromium \
  moonlight-qt \
  gliff \
  obs-studio \
  gpu-screen-recorder \
  grim \
  wtype \
  hyprland-preview-share-picker \
  slurp
```

<br>

If you don't use Docker, remove it (this also deletes all local Docker images, containers, and volumes):

```bash
sudo pacman -Rns docker docker-buildx docker-compose containerd runc ufw-docker lazydocker
sudo rm -rf /var/lib/docker
```

<br>

---

# 🔒 Filesystem: Permissions and Logs

<br>

This section restricts access to personal files, reviews the logs that record logins and failed authentication attempts, and configures the audit rules that feed those logs.

<br>

## Permissions

<br>

Make sure your home directory is only accessible by you:

```bash
chmod 700 "$HOME"
ls -ld "$HOME"
```

<br>

## Logs

<br>

Look at the SSH logs:

```bash
sudo journalctl -u sshd
```

Check recent login sessions:

```bash
last -a
```

Check recent authentication records:

```bash
sudo journalctl -b | grep -Ei 'authentication failure|failed password|sudo:'
```

<br>

Check remote logging configuration:

```bash
grep -RniE '(@@?|omfwd|Target=)' /etc/rsyslog.conf /etc/rsyslog.d/ 2>/dev/null
systemctl status rsyslog --no-pager
```

<br>

## Audit Rules

<br>

Check that the security-sensitive paths exist before writing audit rules for them:

```bash
for path in /etc/passwd /etc/group /etc/shadow /etc/gshadow /etc/sudoers /etc/sudoers.d /etc/pam.d /etc/security /etc/ssh/sshd_config /etc/audit /etc/NetworkManager/system-connections; do
    if [ -e "$path" ]; then
        printf "EXISTS   %s\n" "$path"
    else
        printf "MISSING  %s\n" "$path"
    fi
done
```

Create a conservative baseline ruleset. It monitors security-sensitive configuration changes without auditing every system call:

```bash
sudo tee /etc/audit/rules.d/10-security-baseline.rules > /dev/null <<'EOF'
# Audit event buffer and failure behavior
-b 8192
-f 1

# User and group identity
-w /etc/passwd -p wa -k identity
-w /etc/group -p wa -k identity
-w /etc/shadow -p wa -k identity
-w /etc/gshadow -p wa -k identity

# Privilege escalation and sudo configuration
-w /etc/sudoers -p wa -k scope
-w /etc/sudoers.d/ -p wa -k scope

# Authentication and access control
-w /etc/pam.d/ -p wa -k auth
-w /etc/security/ -p wa -k auth

# SSH configuration
-w /etc/ssh/sshd_config -p wa -k sshd

# Audit configuration
-w /etc/audit/ -p wa -k audit

# Network and firewall configuration
-w /etc/NetworkManager/system-connections/ -p wa -k network
-w /etc/ufw/ -p wa -k firewall
-w /etc/default/ufw -p wa -k firewall

# Kernel security configuration
-w /etc/sysctl.conf -p wa -k sysctl
-w /etc/sysctl.d/ -p wa -k sysctl
EOF
```

Review the rules file and validate the ruleset:

```bash
sudo cat /etc/audit/rules.d/10-security-baseline.rules
sudo augenrules --check
```

> **Note:** Until the rules are loaded, `augenrules --check` reports that the rules have changed. This is expected. It does not validate the rule syntax, so check the output of the load step below for errors.

Load the rules and inspect them. The audit configuration itself is not made immutable (`-e 2`) at this stage:

```bash
sudo augenrules --load
sudo auditctl -l
sudo auditctl -s
```

> **Note:** On the first attempt, `auditctl -l` reported `No rules`, and `audit-rules.service` failed. Use the following commands to find the cause. Clear existing rules with `sudo auditctl -D` before any manual reload.

Check the service status and its log:

```bash
systemctl status audit-rules.service --no-pager
sudo journalctl -u audit-rules.service -b --no-pager
```

Load the compiled file directly and check the exit code:

```bash
sudo auditctl -R /etc/audit/audit.rules
echo "exit code: $?"
```

Test the basic directives one at a time to find the one that fails:

```bash
sudo auditctl -b 8192
sudo auditctl -f 1
sudo auditctl -w /etc/passwd -p wa -k identity
sudo auditctl -l
```

Test a watch rule on its own. If each watch is accepted individually, the problem lies in loading the complete file rather than in a single rule:

```bash
sudo auditctl -w /etc/sysctl.d/ -p wa -k sysctl
sudo auditctl -l
```

> **Note:** `auditctl` may print `Old style watch rules are slower` for `-w` rules. The `-w` syntax still works, and it is used here for readability. For higher event volumes, check `auditctl(8)` for the newer rule syntax.

`auditctl -R` can stop at the first error. The `-i` option ignores errors while reading a rules file, which can help isolate the failing rule, but it can also hide a failure. Use it only for diagnosis.

> **Note:** `auditd.service` only wants `audit-rules.service`, so a failed rule load does not stop the audit daemon from starting.

Check the kernel log for audit errors:

```bash
sudo journalctl -k -b --no-pager | grep -i audit | tail -40
```

> **Note:** Errors such as `audit: error in audit_log_subj_ctx` indicate a kernel-level problem, not a rule problem. Do not treat the audit setup as healthy until these errors stop. See the LSM order check in the AppArmor section.

<br>

## Validate Audit Events

<br>

Loading the rules is not enough. Confirm that the audit system records events. The following test creates and removes a file in `/etc/audit/`, which is covered by a watch:

```bash
sudo install -m 600 /dev/null /etc/audit/.audit-validation-test
sudo rm /etc/audit/.audit-validation-test
```

Search the audit log for the recent events and check the counters:

```bash
sudo ausearch -k audit -ts recent -i | tail -60
sudo auditctl -s
```

A successful test shows three events: the file creation (`nametype=CREATE`), the permission change (`fchmodat`), and the deletion (`nametype=DELETE`). Each event records the login identity (`auid`), the effective user, the process, and the executable. `lost 0` means that no records were dropped.

> **Note:** `subj=unconfined` describes the execution context of the command. It does not indicate a rule failure.

<br>

## Audit Log Protection

<br>

Check the ownership and permissions of the audit log, the logging configuration, and the filesystem that holds the logs:

```bash
sudo stat -c '%A %a %U:%G %n' /var/log/audit /var/log/audit/audit.log
sudo ls -lah /var/log/audit/
sudo grep -nE '^(log_file|log_group|log_format|flush|freq|write_logs|max_log_file|num_logs|max_log_file_action|space_left|space_left_action|admin_space_left|admin_space_left_action|disk_full_action|disk_error_action)' /etc/audit/auditd.conf
df -hT /var/log/audit
```

Auditd manages its own rotation, so no logrotate entry is expected for the audit log.

> **Note:** With the default settings, the log keeps roughly 40 to 48 MB of history, and the disk-space warnings trigger only when space is critically low. The `SUSPEND` actions stop audit logging when the disk is full. This is preferable to silently losing records.

Increase the retention and the disk-space thresholds. Back up the configuration first, and change only these four settings:

```bash
sudo cp -a /etc/audit/auditd.conf "/etc/audit/auditd.conf.backup-$(date +%F-%H%M%S)"

sudo sed -i -E \
  -e 's/^max_log_file[[:space:]]*=.*/max_log_file = 50/' \
  -e 's/^num_logs[[:space:]]*=.*/num_logs = 10/' \
  -e 's/^space_left[[:space:]]*=.*/space_left = 5120/' \
  -e 's/^admin_space_left[[:space:]]*=.*/admin_space_left = 2048/' \
  /etc/audit/auditd.conf

sudo grep -nE '^(max_log_file|num_logs|space_left|admin_space_left)[[:space:]]*=' /etc/audit/auditd.conf
```

Keep the existing `ROTATE`, `SYSLOG`, and `SUSPEND` actions. They provide a controlled response when space runs out.

<br>

## Login UID Attribution

<br>

A login UID ties each process to the login session that started it. Before making it immutable, confirm that the current session and its processes carry the expected UID:

```bash
cat /proc/self/loginuid
sudo cat /proc/1/loginuid
sudo grep -Rns 'pam_loginuid' /etc/pam.d/
loginctl list-sessions
```

Check the processes of the user session:

```bash
ps -p $$ -o pid,ppid,user,comm,luid
ps -u "$USER" -o pid,ppid,comm,luid --sort=pid | head -30
```

Your shell and user processes should report your UID. PID 1 reports `4294967295`, which means that no login UID is set, and that is normal for system initialization. On this system, all inspected user-session processes reported UID 1000, and no container runtime was active.

Check whether an immutability rule already exists:

```bash
sudo grep -Rns -- '--loginuid-immutable' /etc/audit/rules.d/ /etc/audit/audit.rules 2>/dev/null
```

> **Note:** `--loginuid-immutable` prevents changes to login UIDs once they are set. Once enabled, it cannot be turned off at runtime; only a reboot clears it. It can also break software that changes its login UID, and some container setups.

After the checks above, enable it for the current boot:

```bash
sudo auditctl --loginuid-immutable
sudo auditctl -s
```

Then make it persistent in its own rules file, so it stays separate from the security baseline:

```bash
sudo tee /etc/audit/rules.d/99-loginuid-immutable.rules > /dev/null <<'EOF'
--loginuid-immutable
EOF
sudo augenrules --load
```

After the next reboot, verify that the setting is active and that all watches are still loaded:

```bash
sudo auditctl -s
sudo auditctl -l | wc -l
```

Look for `loginuid_immutable 1`, `lost 0`, and `backlog 0`. The watch count should match the number of rules in the baseline.

<br>

---

# 🔒 Persistence: What Starts Automatically

<br>

Malicious software often configures itself to start again after a reboot. This section reviews the places where programs can launch automatically.

<br>

Check for anything that starts automatically:

```bash
crontab -l
sudo ls -la /etc/cron.*
systemctl list-timers --all
systemctl --user list-unit-files --state=enabled
ls -la ~/.config/autostart
```

<br>

---

# 🔒 Verification: Audits and Malware Scans

<br>

After applying the changes, this section verifies them. It covers package integrity, malware and rootkit scans, and a full system audit. Repeat these checks periodically, for example weekly, to catch configuration regressions.

<br>

## Package Verification

<br>

Check package integrity and known vulnerabilities:

```bash
pacman -Qkk
sudo pacman -S arch-audit
arch-audit -u
```

<br>

## Malware and Rootkit Detection

<br>

> **Note:** The tools below ([ClamAV](https://en.wikipedia.org/wiki/ClamAV), rkhunter, and Lynis) are a first pass only. Later, we will review their reports in detail and add more information to this section.

<br>

Install ClamAV, update its virus signatures, and scan the home directory and the full system:

```bash
sudo pacman -S clamav
sudo freshclam
clamscan -r -i "$HOME"
sudo clamscan -r -i / \
  --exclude-dir="^/sys" \
  --exclude-dir="^/proc" \
  --exclude-dir="^/dev" \
  --log="/var/log/clamscan_full.log"
```

<br>

Install rkhunter, update its database, and run a check:

```bash
sudo pacman -S rkhunter
sudo rkhunter --update
sudo rkhunter --check
```

<br>

If rkhunter flags a legitimate script, whitelist it in the configuration file:

```bash
sudo nvim /etc/rkhunter.conf
```

Add:

```
SCRIPTWHITELIST="/usr/bin/egrep"
SCRIPTWHITELIST="/usr/bin/fgrep"
SCRIPTWHITELIST="/usr/bin/ldd"
```

<br>

Install Lynis and run a full system audit:

```bash
sudo pacman -S lynis
sudo lynis audit system
```

<br>

---

##### That's it for today. See you in the next update!

##### ⬛️
