<?php
require_once 'Readability.php';
include("proper_nouns.php");
header('Content-Type: text/plain; charset=utf-8');

// get latest Medialens alert 
// (change this URL to whatever you'd like to test)
$url = 'http://www.lequipe.fr/Formule-1/Actualites/Le-plus-fort-c-est-hamilton/511900';
$html = file_get_contents($url);
 
// PHP Readability works with UTF-8 encoded content. 
// If $html is not UTF-8 encoded, use iconv() or 
// mb_convert_encoding() to convert to UTF-8.

// If we've got Tidy, let's clean up input.
// This step is highly recommended - PHP's default HTML parser
// often does a terrible job and results in strange output.
if (function_exists('tidy_parse_string')) {
	$tidy = tidy_parse_string($html, array(), 'UTF8');
	$tidy->cleanRepair();
	$html = $tidy->value;
}

// give it to Readability
$readability = new Readability($html, $url);

// print debug output? 
// useful to compare against Arc90's original JS version - 
// simply click the bookmarklet with FireBug's 
// console window open
$readability->debug = false;

// convert links to footnotes?
$readability->convertLinksToFootnotes = false;

// process it
$result = $readability->init();

// does it look like we found what we wanted?
if ($result) {
	$content = $readability->getContent()->innerHTML;

	// if we've got Tidy, let's clean it up for output
	if (function_exists('tidy_parse_string')) {
		$tidy = tidy_parse_string($content, 
			array('indent'=>false, 'show-body-only'=>true), 
			'UTF8');
		$tidy->cleanRepair();
		$content = $tidy->value;
	}
	$text_filtered = preg_replace('/([^a-zA-Z0-9ÀÁÂÃÄÅàáâãäåÒÓÔÕÖØòóôõöøÈÉÊËèéêëÇçÌÍÎÏìíîïÙÚÛÜùúûüÿÑñ_-])(\s+)/', ' ',strip_tags($content));
	$text_filtered2 = preg_replace('/[\"]/','',$text_filtered);
	$pn = new proper_nouns();
	$arr = $pn->get($text_filtered2);
	//echo $text."\n";
	print_r($arr);
} else {
	echo 'Looks like we couldn\'t find the content.';
}
