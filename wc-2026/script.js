// ISO 3166-1 alpha-2 codes for flagcdn.com
const FLAGS = {
  Mexico: 'mx',
  'South Africa': 'za',
  'South Korea': 'kr',
  Czechia: 'cz',
  Canada: 'ca',
  'Bosnia & Herzegovina': 'ba',
  USA: 'us',
  Paraguay: 'py',
  Qatar: 'qa',
  Switzerland: 'ch',
  Brazil: 'br',
  Morocco: 'ma',
  Haiti: 'ht',
  Scotland: 'gb-sct',
  Australia: 'au',
  Türkiye: 'tr',
  Germany: 'de',
  Curaçao: 'cw',
  'Ivory Coast': 'ci',
  Ecuador: 'ec',
  Netherlands: 'nl',
  Japan: 'jp',
  Sweden: 'se',
  Tunisia: 'tn',
  Spain: 'es',
  'Cape Verde': 'cv',
  Belgium: 'be',
  Egypt: 'eg',
  'Saudi Arabia': 'sa',
  Uruguay: 'uy',
  Iran: 'ir',
  'New Zealand': 'nz',
  France: 'fr',
  Senegal: 'sn',
  Iraq: 'iq',
  Norway: 'no',
  Argentina: 'ar',
  Algeria: 'dz',
  Austria: 'at',
  Jordan: 'jo',
  Portugal: 'pt',
  'DR Congo': 'cd',
  England: 'gb-eng',
  Croatia: 'hr',
  Ghana: 'gh',
  Panama: 'pa',
  Uzbekistan: 'uz',
  Colombia: 'co',
};

const STAGES = [
  {
    id: 'group',
    title: 'VÒNG BẢNG',
    icon: '⚽',
    meta: '11 Tháng 6 – 27 Tháng 6, 2026 · 12 Bảng (A–L) · 48 Đội',
    days: [
      {
        date: 'Thứ Năm, 11/6/2026',
        matches: [
          {
            group: 'A',
            home: 'Mexico',
            away: 'South Africa',
            time: '3:00 PM ET',
            venue: 'Estadio Azteca',
            city: 'Mexico City',
          },
          {
            group: 'A',
            home: 'South Korea',
            away: 'Czechia',
            time: '10:00 PM ET',
            venue: 'Estadio Akron',
            city: 'Zapopan',
          },
        ],
      },
      {
        date: 'Thứ Sáu, 12/6/2026',
        matches: [
          {
            group: 'B',
            home: 'Canada',
            away: 'Bosnia & Herzegovina',
            time: '3:00 PM ET',
            venue: 'BMO Field',
            city: 'Toronto',
          },
          {
            group: 'D',
            home: 'USA',
            away: 'Paraguay',
            time: '9:00 PM ET',
            venue: 'SoFi Stadium',
            city: 'Inglewood',
          },
        ],
      },
      {
        date: 'Thứ Bảy, 13/6/2026',
        matches: [
          {
            group: 'B',
            home: 'Qatar',
            away: 'Switzerland',
            time: '3:00 PM ET',
            venue: "Levi's Stadium",
            city: 'Santa Clara',
          },
          {
            group: 'C',
            home: 'Brazil',
            away: 'Morocco',
            time: '6:00 PM ET',
            venue: 'MetLife Stadium',
            city: 'East Rutherford',
          },
          {
            group: 'C',
            home: 'Haiti',
            away: 'Scotland',
            time: '9:00 PM ET',
            venue: 'Gillette Stadium',
            city: 'Foxborough',
          },
        ],
      },
      {
        date: 'Chủ Nhật, 14/6/2026',
        matches: [
          {
            group: 'D',
            home: 'Australia',
            away: 'Türkiye',
            time: '12:00 AM ET',
            venue: 'BC Place',
            city: 'Vancouver',
          },
          {
            group: 'E',
            home: 'Germany',
            away: 'Curaçao',
            time: '1:00 PM ET',
            venue: 'NRG Stadium',
            city: 'Houston',
          },
          {
            group: 'F',
            home: 'Netherlands',
            away: 'Japan',
            time: '4:00 PM ET',
            venue: 'AT&T Stadium',
            city: 'Arlington',
          },
          {
            group: 'E',
            home: 'Ivory Coast',
            away: 'Ecuador',
            time: '7:00 PM ET',
            venue: 'Lincoln Financial Field',
            city: 'Philadelphia',
          },
          {
            group: 'F',
            home: 'Sweden',
            away: 'Tunisia',
            time: '10:00 PM ET',
            venue: 'Estadio BBVA',
            city: 'Monterrey',
          },
        ],
      },
      {
        date: 'Thứ Hai, 15/6/2026',
        matches: [
          {
            group: 'H',
            home: 'Spain',
            away: 'Cape Verde',
            time: '12:00 PM ET',
            venue: 'Mercedes-Benz Stadium',
            city: 'Atlanta',
          },
          {
            group: 'G',
            home: 'Belgium',
            away: 'Egypt',
            time: '3:00 PM ET',
            venue: 'Lumen Field',
            city: 'Seattle',
          },
          {
            group: 'H',
            home: 'Saudi Arabia',
            away: 'Uruguay',
            time: '6:00 PM ET',
            venue: 'Hard Rock Stadium',
            city: 'Miami Gardens',
          },
          {
            group: 'G',
            home: 'Iran',
            away: 'New Zealand',
            time: '9:00 PM ET',
            venue: 'SoFi Stadium',
            city: 'Inglewood',
          },
        ],
      },
      {
        date: 'Thứ Ba, 16/6/2026',
        matches: [
          {
            group: 'I',
            home: 'France',
            away: 'Senegal',
            time: '3:00 PM ET',
            venue: 'MetLife Stadium',
            city: 'East Rutherford',
          },
          {
            group: 'I',
            home: 'Iraq',
            away: 'Norway',
            time: '6:00 PM ET',
            venue: 'Gillette Stadium',
            city: 'Foxborough',
          },
          {
            group: 'J',
            home: 'Argentina',
            away: 'Algeria',
            time: '9:00 PM ET',
            venue: 'Arrowhead Stadium',
            city: 'Kansas City',
          },
        ],
      },
      {
        date: 'Thứ Tư, 17/6/2026',
        matches: [
          {
            group: 'J',
            home: 'Austria',
            away: 'Jordan',
            time: '12:00 AM ET',
            venue: "Levi's Stadium",
            city: 'Santa Clara',
          },
          {
            group: 'K',
            home: 'Portugal',
            away: 'DR Congo',
            time: '1:00 PM ET',
            venue: 'NRG Stadium',
            city: 'Houston',
          },
          {
            group: 'L',
            home: 'England',
            away: 'Croatia',
            time: '4:00 PM ET',
            venue: 'AT&T Stadium',
            city: 'Arlington',
          },
          {
            group: 'L',
            home: 'Ghana',
            away: 'Panama',
            time: '7:00 PM ET',
            venue: 'BMO Field',
            city: 'Toronto',
          },
          {
            group: 'K',
            home: 'Uzbekistan',
            away: 'Colombia',
            time: '10:00 PM ET',
            venue: 'Estadio Azteca',
            city: 'Mexico City',
          },
        ],
      },
      {
        date: 'Thứ Năm, 18/6/2026',
        matches: [
          {
            group: 'A',
            home: 'Czechia',
            away: 'South Africa',
            time: '12:00 PM ET',
            venue: 'Mercedes-Benz Stadium',
            city: 'Atlanta',
          },
          {
            group: 'B',
            home: 'Switzerland',
            away: 'Bosnia & Herzegovina',
            time: '3:00 PM ET',
            venue: 'SoFi Stadium',
            city: 'Inglewood',
          },
          {
            group: 'B',
            home: 'Canada',
            away: 'Qatar',
            time: '6:00 PM ET',
            venue: 'BC Place',
            city: 'Vancouver',
          },
          {
            group: 'A',
            home: 'Mexico',
            away: 'South Korea',
            time: '9:00 PM ET',
            venue: 'Estadio Akron',
            city: 'Zapopan',
          },
        ],
      },
      {
        date: 'Thứ Sáu, 19/6/2026',
        matches: [
          {
            group: 'D',
            home: 'USA',
            away: 'Australia',
            time: '3:00 PM ET',
            venue: 'Lumen Field',
            city: 'Seattle',
          },
          {
            group: 'C',
            home: 'Scotland',
            away: 'Morocco',
            time: '6:00 PM ET',
            venue: 'Gillette Stadium',
            city: 'Foxborough',
          },
          {
            group: 'C',
            home: 'Brazil',
            away: 'Haiti',
            time: '8:30 PM ET',
            venue: 'Lincoln Financial Field',
            city: 'Philadelphia',
          },
          {
            group: 'D',
            home: 'Türkiye',
            away: 'Paraguay',
            time: '11:00 PM ET',
            venue: "Levi's Stadium",
            city: 'Santa Clara',
          },
        ],
      },
      {
        date: 'Thứ Bảy, 20/6/2026',
        matches: [
          {
            group: 'F',
            home: 'Netherlands',
            away: 'Sweden',
            time: '1:00 PM ET',
            venue: 'NRG Stadium',
            city: 'Houston',
          },
          {
            group: 'E',
            home: 'Germany',
            away: 'Ivory Coast',
            time: '4:00 PM ET',
            venue: 'BMO Field',
            city: 'Toronto',
          },
          {
            group: 'E',
            home: 'Ecuador',
            away: 'Curaçao',
            time: '8:00 PM ET',
            venue: 'Arrowhead Stadium',
            city: 'Kansas City',
          },
        ],
      },
      {
        date: 'Chủ Nhật, 21/6/2026',
        matches: [
          {
            group: 'F',
            home: 'Tunisia',
            away: 'Japan',
            time: '12:00 AM ET',
            venue: 'Estadio BBVA',
            city: 'Monterrey',
          },
          {
            group: 'H',
            home: 'Spain',
            away: 'Saudi Arabia',
            time: '12:00 PM ET',
            venue: 'Mercedes-Benz Stadium',
            city: 'Atlanta',
          },
          {
            group: 'G',
            home: 'Belgium',
            away: 'Iran',
            time: '3:00 PM ET',
            venue: 'SoFi Stadium',
            city: 'Inglewood',
          },
          {
            group: 'H',
            home: 'Uruguay',
            away: 'Cape Verde',
            time: '6:00 PM ET',
            venue: 'Hard Rock Stadium',
            city: 'Miami Gardens',
          },
          {
            group: 'G',
            home: 'New Zealand',
            away: 'Egypt',
            time: '9:00 PM ET',
            venue: 'BC Place',
            city: 'Vancouver',
          },
        ],
      },
      {
        date: 'Thứ Hai, 22/6/2026',
        matches: [
          {
            group: 'J',
            home: 'Argentina',
            away: 'Austria',
            time: '1:00 PM ET',
            venue: 'AT&T Stadium',
            city: 'Arlington',
          },
          {
            group: 'I',
            home: 'France',
            away: 'Iraq',
            time: '5:00 PM ET',
            venue: 'Lincoln Financial Field',
            city: 'Philadelphia',
          },
          {
            group: 'I',
            home: 'Norway',
            away: 'Senegal',
            time: '8:00 PM ET',
            venue: 'MetLife Stadium',
            city: 'East Rutherford',
          },
          {
            group: 'J',
            home: 'Jordan',
            away: 'Algeria',
            time: '11:00 PM ET',
            venue: "Levi's Stadium",
            city: 'Santa Clara',
          },
        ],
      },
      {
        date: 'Thứ Ba, 23/6/2026',
        matches: [
          {
            group: 'K',
            home: 'Portugal',
            away: 'Uzbekistan',
            time: '1:00 PM ET',
            venue: 'NRG Stadium',
            city: 'Houston',
          },
          {
            group: 'L',
            home: 'England',
            away: 'Ghana',
            time: '4:00 PM ET',
            venue: 'Gillette Stadium',
            city: 'Foxborough',
          },
          {
            group: 'L',
            home: 'Panama',
            away: 'Croatia',
            time: '7:00 PM ET',
            venue: 'BMO Field',
            city: 'Toronto',
          },
          {
            group: 'K',
            home: 'Colombia',
            away: 'DR Congo',
            time: '10:00 PM ET',
            venue: 'Estadio Akron',
            city: 'Zapopan',
          },
        ],
      },
      {
        date: 'Thứ Tư, 24/6/2026 – Lượt trận cuối',
        matches: [
          {
            group: 'B',
            home: 'Switzerland',
            away: 'Canada',
            time: '3:00 PM ET',
            venue: 'BC Place',
            city: 'Vancouver',
          },
          {
            group: 'B',
            home: 'Bosnia & Herzegovina',
            away: 'Qatar',
            time: '3:00 PM ET',
            venue: 'Lumen Field',
            city: 'Seattle',
          },
          {
            group: 'C',
            home: 'Scotland',
            away: 'Brazil',
            time: '6:00 PM ET',
            venue: 'Hard Rock Stadium',
            city: 'Miami Gardens',
          },
          {
            group: 'C',
            home: 'Morocco',
            away: 'Haiti',
            time: '6:00 PM ET',
            venue: 'Mercedes-Benz Stadium',
            city: 'Atlanta',
          },
          {
            group: 'A',
            home: 'Czechia',
            away: 'Mexico',
            time: '9:00 PM ET',
            venue: 'Estadio Azteca',
            city: 'Mexico City',
          },
          {
            group: 'A',
            home: 'South Africa',
            away: 'South Korea',
            time: '9:00 PM ET',
            venue: 'Estadio BBVA',
            city: 'Monterrey',
          },
        ],
      },
      {
        date: 'Thứ Năm, 25/6/2026 – Lượt trận cuối',
        matches: [
          {
            group: 'E',
            home: 'Curaçao',
            away: 'Ivory Coast',
            time: '4:00 PM ET',
            venue: 'Lincoln Financial Field',
            city: 'Philadelphia',
          },
          {
            group: 'E',
            home: 'Ecuador',
            away: 'Germany',
            time: '4:00 PM ET',
            venue: 'MetLife Stadium',
            city: 'East Rutherford',
          },
          {
            group: 'F',
            home: 'Japan',
            away: 'Sweden',
            time: '7:00 PM ET',
            venue: 'AT&T Stadium',
            city: 'Arlington',
          },
          {
            group: 'F',
            home: 'Tunisia',
            away: 'Netherlands',
            time: '7:00 PM ET',
            venue: 'Arrowhead Stadium',
            city: 'Kansas City',
          },
          {
            group: 'D',
            home: 'Türkiye',
            away: 'USA',
            time: '10:00 PM ET',
            venue: 'SoFi Stadium',
            city: 'Inglewood',
          },
          {
            group: 'D',
            home: 'Paraguay',
            away: 'Australia',
            time: '10:00 PM ET',
            venue: "Levi's Stadium",
            city: 'Santa Clara',
          },
        ],
      },
      {
        date: 'Thứ Sáu, 26/6/2026 – Lượt trận cuối',
        matches: [
          {
            group: 'I',
            home: 'Norway',
            away: 'France',
            time: '3:00 PM ET',
            venue: 'Gillette Stadium',
            city: 'Foxborough',
          },
          {
            group: 'I',
            home: 'Senegal',
            away: 'Iraq',
            time: '3:00 PM ET',
            venue: 'BMO Field',
            city: 'Toronto',
          },
          {
            group: 'H',
            home: 'Cape Verde',
            away: 'Saudi Arabia',
            time: '8:00 PM ET',
            venue: 'NRG Stadium',
            city: 'Houston',
          },
          {
            group: 'H',
            home: 'Uruguay',
            away: 'Spain',
            time: '8:00 PM ET',
            venue: 'Estadio Akron',
            city: 'Zapopan',
          },
          {
            group: 'G',
            home: 'Egypt',
            away: 'Iran',
            time: '11:00 PM ET',
            venue: 'Lumen Field',
            city: 'Seattle',
          },
          {
            group: 'G',
            home: 'New Zealand',
            away: 'Belgium',
            time: '11:00 PM ET',
            venue: 'BC Place',
            city: 'Vancouver',
          },
        ],
      },
      {
        date: 'Thứ Bảy, 27/6/2026 – Lượt trận cuối',
        matches: [
          {
            group: 'L',
            home: 'Panama',
            away: 'England',
            time: '5:00 PM ET',
            venue: 'MetLife Stadium',
            city: 'East Rutherford',
          },
          {
            group: 'L',
            home: 'Croatia',
            away: 'Ghana',
            time: '5:00 PM ET',
            venue: 'Lincoln Financial Field',
            city: 'Philadelphia',
          },
          {
            group: 'K',
            home: 'Colombia',
            away: 'Portugal',
            time: '7:30 PM ET',
            venue: 'Hard Rock Stadium',
            city: 'Miami Gardens',
          },
          {
            group: 'K',
            home: 'DR Congo',
            away: 'Uzbekistan',
            time: '7:30 PM ET',
            venue: 'Mercedes-Benz Stadium',
            city: 'Atlanta',
          },
          {
            group: 'J',
            home: 'Algeria',
            away: 'Austria',
            time: '10:00 PM ET',
            venue: 'Arrowhead Stadium',
            city: 'Kansas City',
          },
          {
            group: 'J',
            home: 'Jordan',
            away: 'Argentina',
            time: '10:00 PM ET',
            venue: 'AT&T Stadium',
            city: 'Arlington',
          },
        ],
      },
    ],
  },
  {
    id: 'r32',
    title: 'VÒNG 1/32',
    icon: '🏆',
    meta: '28 Tháng 6 – 3 Tháng 7, 2026 · 16 Trận · Vòng loại trực tiếp',
    days: [
      {
        date: 'Chủ Nhật, 28/6/2026',
        matches: [
          {
            group: 'R32',
            home: 'Á quân A',
            away: 'Á quân B',
            matchNum: '73',
            time: '3:00 PM ET',
            venue: 'SoFi Stadium',
            city: 'Inglewood',
          },
        ],
      },
      {
        date: 'Thứ Hai, 29/6/2026',
        matches: [
          {
            group: 'R32',
            home: 'Nhất C',
            away: 'Á quân F',
            matchNum: '76',
            time: '1:00 PM ET',
            venue: 'NRG Stadium',
            city: 'Houston',
          },
          {
            group: 'R32',
            home: 'Nhất E',
            away: 'Nhì 3 tốt nhất (A/B/C/D/F)',
            matchNum: '74',
            time: '4:30 PM ET',
            venue: 'Gillette Stadium',
            city: 'Foxborough',
          },
          {
            group: 'R32',
            home: 'Nhất F',
            away: 'Á quân C',
            matchNum: '75',
            time: '9:00 PM ET',
            venue: 'Estadio BBVA',
            city: 'Monterrey',
          },
        ],
      },
      {
        date: 'Thứ Ba, 30/6/2026',
        matches: [
          {
            group: 'R32',
            home: 'Á quân E',
            away: 'Á quân I',
            matchNum: '78',
            time: '1:00 PM ET',
            venue: 'AT&T Stadium',
            city: 'Arlington',
          },
          {
            group: 'R32',
            home: 'Nhất I',
            away: 'Nhì 3 tốt nhất (C/D/F/G/H)',
            matchNum: '77',
            time: '5:00 PM ET',
            venue: 'MetLife Stadium',
            city: 'East Rutherford',
          },
          {
            group: 'R32',
            home: 'Nhất A',
            away: 'Nhì 3 tốt nhất (C/E/F/H/I)',
            matchNum: '79',
            time: '9:00 PM ET',
            venue: 'Estadio Azteca',
            city: 'Mexico City',
          },
        ],
      },
      {
        date: 'Thứ Tư, 1/7/2026',
        matches: [
          {
            group: 'R32',
            home: 'Nhất L',
            away: 'Nhì 3 tốt nhất (E/H/I/J/K)',
            matchNum: '80',
            time: '12:00 PM ET',
            venue: 'Mercedes-Benz Stadium',
            city: 'Atlanta',
          },
          {
            group: 'R32',
            home: 'Nhất G',
            away: 'Nhì 3 tốt nhất (A/E/H/I/J)',
            matchNum: '82',
            time: '4:00 PM ET',
            venue: 'Lumen Field',
            city: 'Seattle',
          },
          {
            group: 'R32',
            home: 'Nhất D',
            away: 'Nhì 3 tốt nhất (B/E/F/I/J)',
            matchNum: '81',
            time: '8:00 PM ET',
            venue: "Levi's Stadium",
            city: 'Santa Clara',
          },
        ],
      },
      {
        date: 'Thứ Năm, 2/7/2026',
        matches: [
          {
            group: 'R32',
            home: 'Nhất H',
            away: 'Á quân J',
            matchNum: '84',
            time: '3:00 PM ET',
            venue: 'SoFi Stadium',
            city: 'Inglewood',
          },
          {
            group: 'R32',
            home: 'Á quân K',
            away: 'Á quân L',
            matchNum: '83',
            time: '7:00 PM ET',
            venue: 'BMO Field',
            city: 'Toronto',
          },
          {
            group: 'R32',
            home: 'Nhất B',
            away: 'Nhì 3 tốt nhất (E/F/G/I/J)',
            matchNum: '85',
            time: '11:00 PM ET',
            venue: 'BC Place',
            city: 'Vancouver',
          },
        ],
      },
      {
        date: 'Thứ Sáu, 3/7/2026',
        matches: [
          {
            group: 'R32',
            home: 'Á quân D',
            away: 'Á quân G',
            matchNum: '88',
            time: '2:00 PM ET',
            venue: 'AT&T Stadium',
            city: 'Arlington',
          },
          {
            group: 'R32',
            home: 'Nhất J',
            away: 'Á quân H',
            matchNum: '86',
            time: '6:00 PM ET',
            venue: 'Hard Rock Stadium',
            city: 'Miami Gardens',
          },
          {
            group: 'R32',
            home: 'Nhất K',
            away: 'Nhì 3 tốt nhất (D/E/I/J/L)',
            matchNum: '87',
            time: '9:30 PM ET',
            venue: 'Arrowhead Stadium',
            city: 'Kansas City',
          },
        ],
      },
    ],
  },
  {
    id: 'r16',
    title: 'VÒNG 1/16',
    icon: '⚡',
    meta: '4 Tháng 7 – 7 Tháng 7, 2026 · 8 Trận',
    days: [
      {
        date: 'Thứ Bảy, 4/7/2026',
        matches: [
          {
            group: 'R16',
            home: 'Thắng trận 73',
            away: 'Thắng trận 75',
            matchNum: '90',
            time: '1:00 PM ET',
            venue: 'NRG Stadium',
            city: 'Houston',
          },
          {
            group: 'R16',
            home: 'Thắng trận 74',
            away: 'Thắng trận 77',
            matchNum: '89',
            time: '5:00 PM ET',
            venue: 'Lincoln Financial Field',
            city: 'Philadelphia',
          },
        ],
      },
      {
        date: 'Chủ Nhật, 5/7/2026',
        matches: [
          {
            group: 'R16',
            home: 'Thắng trận 76',
            away: 'Thắng trận 78',
            matchNum: '91',
            time: '4:00 PM ET',
            venue: 'MetLife Stadium',
            city: 'East Rutherford',
          },
          {
            group: 'R16',
            home: 'Thắng trận 79',
            away: 'Thắng trận 80',
            matchNum: '92',
            time: '8:00 PM ET',
            venue: 'Estadio Azteca',
            city: 'Mexico City',
          },
        ],
      },
      {
        date: 'Thứ Hai, 6/7/2026',
        matches: [
          {
            group: 'R16',
            home: 'Thắng trận 83',
            away: 'Thắng trận 84',
            matchNum: '93',
            time: '3:00 PM ET',
            venue: 'AT&T Stadium',
            city: 'Arlington',
          },
          {
            group: 'R16',
            home: 'Thắng trận 81',
            away: 'Thắng trận 82',
            matchNum: '94',
            time: '8:00 PM ET',
            venue: 'Lumen Field',
            city: 'Seattle',
          },
        ],
      },
      {
        date: 'Thứ Ba, 7/7/2026',
        matches: [
          {
            group: 'R16',
            home: 'Thắng trận 86',
            away: 'Thắng trận 88',
            matchNum: '95',
            time: '12:00 PM ET',
            venue: 'Mercedes-Benz Stadium',
            city: 'Atlanta',
          },
          {
            group: 'R16',
            home: 'Thắng trận 85',
            away: 'Thắng trận 87',
            matchNum: '96',
            time: '4:00 PM ET',
            venue: 'BC Place',
            city: 'Vancouver',
          },
        ],
      },
    ],
  },
  {
    id: 'qf',
    title: 'TỨ KẾT',
    icon: '🌟',
    meta: '9 Tháng 7 – 11 Tháng 7, 2026 · 4 Trận',
    days: [
      {
        date: 'Thứ Năm, 9/7/2026',
        matches: [
          {
            group: 'QF',
            home: 'Thắng trận 89',
            away: 'Thắng trận 90',
            matchNum: '97',
            time: '4:00 PM ET',
            venue: 'Gillette Stadium',
            city: 'Foxborough',
          },
        ],
      },
      {
        date: 'Thứ Sáu, 10/7/2026',
        matches: [
          {
            group: 'QF',
            home: 'Thắng trận 93',
            away: 'Thắng trận 94',
            matchNum: '98',
            time: '3:00 PM ET',
            venue: 'SoFi Stadium',
            city: 'Inglewood',
          },
        ],
      },
      {
        date: 'Thứ Bảy, 11/7/2026',
        matches: [
          {
            group: 'QF',
            home: 'Thắng trận 91',
            away: 'Thắng trận 92',
            matchNum: '99',
            time: '5:00 PM ET',
            venue: 'Hard Rock Stadium',
            city: 'Miami Gardens',
          },
          {
            group: 'QF',
            home: 'Thắng trận 95',
            away: 'Thắng trận 96',
            matchNum: '100',
            time: '9:00 PM ET',
            venue: 'Arrowhead Stadium',
            city: 'Kansas City',
          },
        ],
      },
    ],
  },
  {
    id: 'sf',
    title: 'BÁN KẾT',
    icon: '💎',
    meta: '14 Tháng 7 – 15 Tháng 7, 2026 · 2 Trận',
    days: [
      {
        date: 'Thứ Ba, 14/7/2026',
        matches: [
          {
            group: 'SF',
            home: 'Thắng trận 97',
            away: 'Thắng trận 98',
            matchNum: '101',
            time: '3:00 PM ET',
            venue: 'AT&T Stadium',
            city: 'Arlington (Dallas)',
          },
        ],
      },
      {
        date: 'Thứ Tư, 15/7/2026',
        matches: [
          {
            group: 'SF',
            home: 'Thắng trận 99',
            away: 'Thắng trận 100',
            matchNum: '102',
            time: '3:00 PM ET',
            venue: 'Mercedes-Benz Stadium',
            city: 'Atlanta',
          },
        ],
      },
    ],
  },
  {
    id: 'final',
    title: 'TRANH HẠNG BA & CHUNG KẾT',
    icon: '🥇',
    meta: '18 Tháng 7 – 19 Tháng 7, 2026',
    days: [
      {
        date: 'Thứ Bảy, 18/7/2026 – Tranh hạng Ba',
        matches: [
          {
            group: '3PL',
            home: 'Thua trận 101',
            away: 'Thua trận 102',
            matchNum: '103',
            time: '5:00 PM ET',
            venue: 'Hard Rock Stadium',
            city: 'Miami Gardens',
          },
        ],
      },
      {
        date: 'Chủ Nhật, 19/7/2026 – ⭐ CHUNG KẾT ⭐',
        matches: [
          {
            group: 'FIN',
            home: 'Thắng trận 101',
            away: 'Thắng trận 102',
            matchNum: '104',
            time: '3:00 PM ET',
            venue: 'MetLife Stadium (NY/NJ Stadium)',
            city: 'East Rutherford, NJ',
            isFinal: true,
          },
        ],
      },
    ],
  },
];

function getFlag(team) {
  const code = FLAGS[team];
  if (!code) return `<span class="flag-placeholder">🏳️</span>`;
  return `<img class="flag-img" src="https://flagcdn.com/w40/${code}.png" srcset="https://flagcdn.com/w80/${code}.png 2x" alt="${team}" loading="lazy" onerror="this.style.display='none'">`;
}

function renderMatch(m) {
  const isKnockoutPlaceholder =
    m.home.includes('trận') ||
    m.home.includes('quân') ||
    m.home.includes('Nhất') ||
    m.home.includes('Nhì') ||
    m.home.includes('Thua') ||
    m.home.includes('Thắng');
  const homeFlag = isKnockoutPlaceholder ? '' : getFlag(m.home);
  const awayFlag = isKnockoutPlaceholder ? '' : getFlag(m.away);
  const finalClass = m.isFinal ? ' final-card' : '';
  const matchNumBadge = m.matchNum
    ? `<span style="font-size:10px;color:var(--muted);margin-left:8px">Trận #${m.matchNum}</span>`
    : '';

  return `
<div class="match-card${finalClass}" data-group="${m.group}" data-teams="${m.home} ${m.away}" data-stage="${m.group}">
<div class="match-top">
  <span class="match-group-badge">Bảng ${m.group}${matchNumBadge}</span>
  <span class="match-time">${m.time}</span>
</div>
<div class="match-teams">
  <div class="team-info home">
    ${homeFlag}
    <span class="team-name home">${m.home}</span>
  </div>
  <div class="vs-badge">VS</div>
  <div class="team-info away">
    <span class="team-name away">${m.away}</span>
    ${awayFlag}
  </div>
</div>
<div class="match-venue">📍 <span>${m.venue}</span> · ${m.city}</div>
</div>`;
}

function renderSchedule() {
  const container = document.getElementById('scheduleContainer');
  let html = '';
  STAGES.forEach((stage) => {
    html += `<div class="stage-block" data-stage="${stage.id}">
<div class="stage-header">
  <div class="stage-icon">${stage.icon}</div>
  <div>
    <div class="stage-title">${stage.title}</div>
    <div class="stage-meta">${stage.meta}</div>
  </div>
  <div class="stage-line"></div>
</div>`;
    stage.days.forEach((day) => {
      html += `<div class="day-section">
  <div class="day-header">${day.date}</div>
  <div class="matches-grid">`;
      day.matches.forEach((m) => {
        html += renderMatch(m);
      });
      html += `</div></div>`;
    });
    html += `</div>`;
  });
  container.innerHTML = html;
}

function filterByStage(stageId) {
  document.querySelectorAll('.stage-block').forEach((el) => {
    if (stageId === 'all') {
      el.classList.remove('hidden');
    } else {
      el.classList.toggle('hidden', el.dataset.stage !== stageId);
    }
  });
}

function filterBySearch(query) {
  const q = query.toLowerCase().trim();
  let total = 0;
  document.querySelectorAll('.match-card').forEach((card) => {
    const teams = card.dataset.teams.toLowerCase();
    const venue = card.querySelector('.match-venue').textContent.toLowerCase();
    const show = !q || teams.includes(q) || venue.includes(q);
    card.classList.toggle('hidden', !show);
    if (show) total++;
  });
  // Hide empty days
  document.querySelectorAll('.day-section').forEach((day) => {
    const visible = day.querySelectorAll('.match-card:not(.hidden)').length;
    day.classList.toggle('hidden', visible === 0);
  });
  document.querySelectorAll('.stage-block').forEach((block) => {
    const visible = block.querySelectorAll('.match-card:not(.hidden)').length;
    block.classList.toggle('hidden', visible === 0);
  });
  document.getElementById('noResults').style.display =
    total === 0 ? 'block' : 'none';
}

// Init
renderSchedule();

// Filters
document.querySelectorAll('.filter-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    document
      .querySelectorAll('.filter-btn')
      .forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('searchInput').value = '';
    filterByStage(btn.dataset.stage);
    document
      .querySelectorAll('.match-card, .day-section')
      .forEach((el) => el.classList.remove('hidden'));
    filterByStage(btn.dataset.stage);
    document.getElementById('noResults').style.display = 'none';
  });
});

document.getElementById('searchInput').addEventListener('input', (e) => {
  document
    .querySelectorAll('.filter-btn')
    .forEach((b) => b.classList.remove('active'));
  document.querySelector('[data-stage="all"]').classList.add('active');
  document
    .querySelectorAll('.match-card, .day-section, .stage-block')
    .forEach((el) => el.classList.remove('hidden'));
  filterBySearch(e.target.value);
});

// Countdown
function updateCountdown() {
  const target = new Date('2026-06-11T19:00:00Z'); // 3PM ET = 19:00 UTC
  const now = new Date();
  const diff = target - now;
  if (diff <= 0) {
    document.getElementById('cd-days').textContent = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent = '00';
    document.getElementById('cd-secs').textContent = '00';
    return;
  }
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent = String(days).padStart(
    2,
    '0',
  );
  document.getElementById('cd-hours').textContent = String(hours).padStart(
    2,
    '0',
  );
  document.getElementById('cd-mins').textContent = String(mins).padStart(
    2,
    '0',
  );
  document.getElementById('cd-secs').textContent = String(secs).padStart(
    2,
    '0',
  );
}
updateCountdown();
setInterval(updateCountdown, 1000);

// Scroll top
const scrollBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
});

// Dark / Light Theme Toggle Logic
const themeToggleBtn = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
  document.body.classList.add('light-theme');
  themeToggleBtn.innerHTML = '☀️ Sáng';
} else {
  themeToggleBtn.innerHTML = '🌙 Tối';
}

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  let theme = 'dark';
  if (document.body.classList.contains('light-theme')) {
    theme = 'light';
    themeToggleBtn.innerHTML = '☀️ Sáng';
  } else {
    themeToggleBtn.innerHTML = '🌙 Tối';
  }
  localStorage.setItem('theme', theme);
});
