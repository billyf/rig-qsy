'use strict';

/** how often the frequency text will be replaced with links */
const REFRESH_INTERVAL_MS = 2000;

const VERBOSE = true;

function replaceFreqsWithLinks(allElements, freqFactor) {
	allElements.each(function(index) {
	    const elChild = $(this).children().first();
	    if (elChild.is('a') && elChild.prop('href').includes('rig-qsy')) {
	        // already been replaced
	        return true; // continues loop - can return false to break if new entries are always added to the top
	    }
		const elText = $(this).text();
		if (VERBOSE) {
		    console.log("elText " + index + ": " + elText);
		}
		
		const freqPart = parseFloat(elText);
		const freqHz = freqFactor * freqPart;

		const replaced = "<a href=\"rig-qsy://" + freqHz + "\">" + elText + "</a>";
		if (VERBOSE) {
		    console.log("replaced: " + replaced);
		}
		
		$(this).html(replaced);
	});
}

setInterval(function() {
	const url = window.location.toString();
	for (const site of SITES) {
	    if (url.includes(site.domain)) {
	        const allElements = $(site.finder);
	        replaceFreqsWithLinks(allElements, site.freqFactor);
	        break;
	    }
	}
}, REFRESH_INTERVAL_MS);

