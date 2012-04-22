/*
1964js - JavaScript/HTML5 port of 1964 - N64 emulator
Copyright (C) 2012 Joel Middendorf

This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
as published by the Free Software Foundation; either version 2
of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, write to the Free Software
Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
*/

var TV_SYSTEM_NTSC = 1
var TV_SYSTEM_PAL = 0

function getTVSystem(countryCode)
{
	var system;
	switch(countryCode)
	{
	case 0: // Demo
		system = TV_SYSTEM_NTSC;
		break;
	case 0x37: // '7'
		system = TV_SYSTEM_NTSC;
		break;
	case 0x41:
		system = TV_SYSTEM_NTSC;
		break;
	case 0x44: // 'D' Germany
		system = TV_SYSTEM_PAL;
		break;
	case 0x45: //'E' United States
		system = TV_SYSTEM_NTSC;
		break;
	case 0x46: // 'F' France
		system = TV_SYSTEM_PAL;
		break;
	case 'I': // 'I' Italy
		system = TV_SYSTEM_PAL;
		break;
	case 0x4A: // 'J' Japan
		system = TV_SYSTEM_NTSC;
		break;
	case 0x50: // 'P' Europe
		system = TV_SYSTEM_PAL;
		break;
	case 0x53: //'S' Spain
		system = TV_SYSTEM_PAL;
		break;
	case 0x55: // 'U' Australia
		system = TV_SYSTEM_PAL;
		break;
	case 0x58: // 'X'
		system = TV_SYSTEM_PAL;
		break;
	case 0x59: // 'Y' Australia
		system = TV_SYSTEM_PAL;
		break;
	case 0x20:
	case 0x21:
	case 0x38:
	case 0x70:
		system = TV_SYSTEM_PAL;
		break;
	default:
		system = TV_SYSTEM_PAL;
		break;
	}

	return system;
}

function getCIC()
{
	var CIC_CRC = 0;
    var cic = 0;
	var i;

	for(i = 0; i < 0xFC0; i++)
		CIC_CRC = CIC_CRC + romUint8Array[0x40 + i];

	switch(CIC_CRC)
	{
	case 0x33a27: //CIC-NUS-6101 (starfox)
	case 0x3421e:
		log("Using CIC-NUS-6101 for starfox\n");
		cic = 0x3f;
	//	rominfo.RDRam_Size_Hack = (uint32) 0x318;
		break;
	case 0x34044: //CIC-NUS-6102 (mario)
		log("Using CIC-NUS-6102 for mario\n");
		cic = 0x3f;
	//	rominfo.RDRam_Size_Hack = (uint32) 0x318;
	//	ROM_CheckSumMario();
		break;
	case 0x357d0: //CIC-NUS-6103 (Banjo)
		log("Using CIC-NUS-6103 for Banjo\n");
		cic = 0x78;
	//	rominfo.RDRam_Size_Hack = (uint32) 0x318;
		break;
	case 0x47a81: //CIC-NUS-6105 (Zelda)
		log("Using CIC-NUS-6105 for Zelda\n");
		rominfo.CIC = 0x91;
	//	rominfo.RDRam_Size_Hack = (uint32) 0x3F0;
	//	ROM_CheckSumZelda();
		break;
	case 0x371cc: //CIC-NUS-6106 (F-Zero X)
		log("Using CIC-NUS-6106 for F-Zero/Yoshi Story\n");
		cic = 0x85;
	//	rominfo.RDRam_Size_Hack = (uint32) 0x318;
		break;
	case 0x343c9: //F1 World Grand Prix
		log("Using Boot Code for F1 World Grand Prix\n");
		cic = 0x85;
	//	rominfo.RDRam_Size_Hack = (uint32) 0x3F0;
		break;
	default:
		log("Unknown boot code, using Mario boot code instead");
		cic = 0x3f;
	//	rominfo.RDRam_Size_Hack = (uint32) 0x318;
		break;
	}

//	Init_VI_Counter(game_country_tvsystem);
    return cic;
}

