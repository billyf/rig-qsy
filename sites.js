'use strict';

/**
To add a new site:
1. Add a new entry in SITES
2. For the 'finder' value: Chrome inspect / copy selector,
   then edit to make it "generic" and catch all the frequency html elements
3. Choose freqFactor so that 'freqFactor * parseFloat(text)' will give hertz
4. Add url to manifest.json
**/

const SITES = [
  {
    "domain": "sotawatch.sota.org.uk",
    "finder": "app-spots div.col-3.pr-1.pl-0",
    "freqFactor": 1000000
  },
  {
    "domain": "pota.app",
    "finder": "main div.layout.row.wrap div.v-list > div:nth-child(3) > div.v-list-item__content.text-xs-left.body-2",
    "freqFactor": 1000
  },
  {
    "domain": "rbn.telegraphy.de",
    "finder": "#spots tbody tr td:nth-child(1)",
    "freqFactor": 1000
  },
  {
    "domain": "beta.reversebeacon.net",
    "finder": "#id_spots > tbody > tr > td.qrg",
	"freqFactor": 1000
  },
  {
    "domain": "reversebeacon.net",
    "finder": "#spots > tbody:nth-child(1) > tr.spot.spots > td.qrg",
	"freqFactor": 1000
  },
  {
    "domain": "dxsummit.fi",
    "finder": "div.view-content.ng-scope tr > td:nth-child(2) > div",
    "finder2": "#everything > div.container > div.view-settings.ng-scope > div.view-content.ng-scope > div > div.col-md-9 > div:nth-child(3) > div:nth-child(1) > table > tbody > tr:nth-child(2) > td:nth-child(2) > div",
	"freqFactor": 1000
  }
];


