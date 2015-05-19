#!usr/bin/perl

use strict;
use warnings;
use LWP::Simple;

my $link = 'http://neighbourhoodstudy.ca/neighbourhoods';
my $sou = get($link) or die "cannot retrieve code\n";
my $last_link;

# Print list of cities and their corresponding links

print "{\n";
for my $line (split qr/\R/, $sou) {
	if ($line =~ /<li><a title\=\"(.*)\"\ href="(.*)\">(.*)<\/a>/) {
		print "\t'$1' : '$2',\n";	
		my $l = $2;
		# Use below cmds to get list of indicators	
		# grep "<td>[a-zA-Z]" extract.log	
		# $last_link = "http://neighbourhoodstudy.ca${l}";
		# print get($last_link);
	}
}
print "}\n";
exit;
