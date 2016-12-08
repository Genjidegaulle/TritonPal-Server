

function getHtmlFile(subjCode) {
	var htmlFile = subjCode;

	switch(subjCode) {
		case('AAS'): 
			htmlFile = 'AAS'; 
			break;
		case('ANAR'): 
		case('ANBI'): 
		case('ANSC'): 
		case('ANTH'): 
			htmlFile = 'ANTH'; 
			break;
		case('BENG'): 
			htmlFile = 'BENG'; 
			break;
		case('BNFO'): 
		case('BGGN'): 
		case('BGSE'): 
		case('BIBC'): 
		case('BICD'): 
		case('BIEB'): 
		case('BILD'): 
		case('BIMM'): 
		case('BIPN'): 
		case('BISP'): 
			htmlFile = 'BIOL'; 
			break;
		case('BIOM'): 
			htmlFile = 'BIOM'; 
			break;
		case('CAT'): 
			htmlFile = 'CAT'; 
			break;
		case('CGS'): 
			htmlFile = 'CGS'; 
			break;
		case('CHEM'): 
			htmlFile = 'CHEM'; 
			break;
		case('CHIN'): 
			htmlFile = 'CHIN'; 
			break;
		case('CLIN'): 
			htmlFile = 'CLIN'; 
			break;
		case('CLRE'): 
			htmlFile = 'CLRE'; 
			break;
		case('COGS'): 
			htmlFile = 'COGS'; 
			break;
		case('COGR'): 
		case('COMM'): 
			htmlFile = 'COMM'; 
			break;
		case('CONT'): 
			htmlFile = 'CONT'; 
			break;
		case('CSE'): 
			htmlFile = 'CSE'; 
			break;
		case('DOC'): 
			htmlFile = 'DOC'; 
			break;
		case('DSGN'): 
			htmlFile = 'DSGN'; 
			break;
		case('ECE'): 
			htmlFile = 'ECE'; 
			break;
		case('ECON'): 
			htmlFile = 'ECON'; 
			break;
		case('EDS'): 
			htmlFile = 'EDS'; 
			break;
		case('ENVR'): 
			htmlFile = 'ENVR'; 
			break;
		case('ERC'): 
			htmlFile = 'ERC'; 
			break;
		case('ESYS'): 
			htmlFile = 'ESYS'; 
			break;
		case('ETHN'): 
			htmlFile = 'ETHN'; 
			break;
		case('FILM'): 
			htmlFile = 'FILM'; 
			break;
		case('FMPH'): 
		case('FPM'): 
		case('FPMU'): 
			htmlFile = 'FMPH'; 
			break;
		case('GLBH'): 
			htmlFile = 'GHP'; 
			break;
		case('IRCO'): 
		case('IRGN'): 
		case('IRLA'): 
			htmlFile = 'GPS'; 
			break;
		case('HDP'): 
			htmlFile = 'HDP'; 
			break;
		case('HIAF'): 
		case('HIEA'): 
		case('HIEU'): 
		case('HIGR'): 
		case('HILA'): 
		case('HILD'): 
		case('HINE'): 
		case('HISC'): 
		case('HITO'): 
		case('HIUS'): 
			htmlFile = 'HIST'; 
			break;
		case('HLAW'): 
			htmlFile = 'HLAW'; 
			break;
		case('HUM'): 
			htmlFile = 'HUM'; 
			break;
		case('INTL'): 
			htmlFile = 'INTL'; 
			break;
		case('JAPN'): 
			htmlFile = 'JAPN'; 
			break;
		case('JUDA'): 
			htmlFile = 'JUDA'; 
			break;
		case('LATI'): 
		case('LHCO'): 
			htmlFile = 'LHCO'; 
			break;
		case('LIAB'): 
		case('LIFR'): 
		case('LIGM'): 
		case('LIGN'): 
		case('LIHL'): 
		case('LIIT'): 
		case('LIPO'): 
		case('LISL'): 
		case('LISP'): 
			htmlFile = 'LING'; 
			break;
		case('LTAF'): 
		case('LTCO'): 
		case('LTCS'): 
		case('LTEA'): 
		case('LTEN'): 
		case('LTEU'): 
		case('LTFR'): 
		case('LTGK'): 
		case('LTGM'): 
		case('LTIT'): 
		case('LTKO'): 
		case('LTLA'): 
		case('LTRU'): 
		case('LTSP'): 
		case('LTTH'): 
		case('LTWL'): 
		case('LTWR'): 
			htmlFile = 'LIT'; 
			break;
		case('MAE'): 
		case('MDE'): 
			htmlFile = 'MAE'; 
			break;
		case('MATH'): 
		case('MATS'): 
			htmlFile = 'MATS'; 
			break;
		case('MBC'): 
			htmlFile = 'MBC'; 
			break;
		case('MCWP'): 
			htmlFile = 'MCWP'; 
			break;
		case('MMW'): 
			htmlFile = 'MMW'; 
			break;
		case('MSED'): 
			htmlFile = 'MSED'; 
			break;
		case('MUS'): 
			htmlFile = 'MUS'; 
			break;
		case('CENG'): 
		case('NANO'): 
			htmlFile = 'NANO'; 
			break;
		case('NEU'): 
			htmlFile = 'NEU'; 
			break;
		case('PHIL'): 
			htmlFile = 'PHIL'; 
			break;
		case('PHYS'): 
			htmlFile = 'PHYS'; 
			break;
		case('POLI'): 
			htmlFile = 'POLI'; 
			break;
		case('PSYC'): 
			htmlFile = 'PSYC'; 
			break;
		case('RELI'): 
			htmlFile = 'RELI'; 
			break;
		case('REV'): 
			htmlFile = 'REV'; 
			break;
		case('MGT'): 
		case('MGTA'): 
		case('MGTF'): 
			htmlFile = 'RSM'; 
			break;
		case('SE'): 
			htmlFile = 'SE'; 
			break;
		case('SIO'): 
		case('SIOB'): 
		case('SIOC'): 
		case('SIOG'): 
			htmlFile = 'SIO'; 
			break;
		case('SOCG'): 
		case('SOCI'): 
			htmlFile = 'SOC'; 
			break;
		case('ENG'): 
			htmlFile = 'SOE'; 
			break;
		case('TDAC'): 
		case('TDCH'): 
		case('TDDE'): 
		case('TDDR'): 
		case('TDGE'): 
		case('TDGR'): 
		case('TDHD'): 
		case('TDHT'): 
		case('TDMV'): 
		case('TDPF'): 
		case('TDPR'): 
		case('TDPW'): 
		case('TDTR'): 
			htmlFile = 'THEA'; 
			break;
		case('TMC'): 
			htmlFile = 'TMC'; 
			break;
		case('TWS'): 
			htmlFile = 'TWS'; 
			break;
		case('USP'): 
			htmlFile = 'USP'; 
			break;
		case('ICAM'): 
		case('VIS'): 
			htmlFile = 'VIS'; 
			break;
		case('WARR'): 
		case('WCWP'): 
			htmlFile = 'WARR'; 
			break;
	}

	return htmlFile + '.html';

}



module.exports = {
getHtmlFile: getHtmlFile,

}
