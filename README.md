# rig-qsy

Chrome extension + bash script to tune your radio by clicking a frequency on the page.

Built-in support for:

- [POTA.app](https://pota.app)
- [SOTAWatch](https://sotawatch.sota.org.uk)
- [Beta RBN](http://beta.reversebeacon.net)
- [RBN](http://reversebeacon.net)
- [CW Club RBN Spotter](https://rbn.telegraphy.de)
- [DX Summit](http://dxsummit.fi)

---

### Chrome extension installation:
Go to **chrome://extensions**, click **Load unpacked**, select your checkout directory

---
### Bash configuration:
If using rigctl, set the `RIG_CTL` definition to match your rigctl parameters

If using NET rigctl (model 2), comment out `RIG_CTL` and set `LOCAL_RIG_CTL` to match your setup

### Adding the rig-qsy:// protocol

1. Create **`$HOME/.local/share/applications/rig-qsy.desktop`**  
and edit `Exec` to the correct path
```
[Desktop Entry]
Name=rig-qsy
Exec=(path to your rig-qsy checkout)/rig-qsy.sh %U
Terminal=true
Type=Application
```

2. Register the protocol handler
```
xdg-mime default rig-qsy.desktop x-scheme-handler/rig-qsy
```

3. Validate that the frequency changes:
```
xdg-open rig-qsy://14047500
```

### To avoid the "Open xdg-open?" prompt every time:

From https://superuser.com/a/1572925
```shell
sudo mkdir -p /etc/opt/chrome/policies/managed/
sudo chmod -R 775 /etc/opt/chrome/policies/managed
```
Then create  
**`/etc/opt/chrome/policies/managed/managed_policies.json`**
```shell
{
    "ExternalProtocolDialogShowAlwaysOpenCheckbox": true,
    "URLWhitelist": [
        "rig-qsy://*"
    ]
}
```

---

### Adding support for other sites:
1. Add a new entry to SITES in sites.js:
```json
{
  "domain": "sotawatch.sota.org.uk",
  "finder": "app-spots div.col-3.pr-1.pl-0",
  "freqFactor": 1000000
}
```

`finder` is a JS selector for which frequency elements to replace with links

`freqFactor` should be set so that `freqFactor * (frequency on page)` gives the Hz value

2. Add a new line in manifest.json under `content_scripts` -> `matches`


3. Refresh the extension in chrome://extensions
