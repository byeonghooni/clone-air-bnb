export const monthList = [
  '1월',
  '2월',
  '3월',
  '4월',
  '5월',
  '6월',
  '7월',
  '8월',
  '9월',
  '10월',
  '11월',
  '12월',
];

export const dayList = Array.from(Array(31), (_, i) => String(i + 1));

export const yearList = Array.from(Array(121), (_, i) => String(2020 - i));

//* 숙소 큰 범위의 건물유형
export const largeBuildingTypeList = [
  '아파트',
  '주택',
  '별채',
  '독특한 숙소',
  'B&B',
  '부티크 호텔',
];

//* 아파트 건물유형
export const apartmentBuildingTypeList = [
  '아파트',
  '공동주택',
  '별채',
  '카사 파르티쿨라르(쿠바)',
  '로프트',
  '레지던스',
];

//*주택 건물유형
export const houseBuildingTypeList = [
  '주택',
  '방갈로',
  '통나무집',
  '카사',
  '파르티쿨라르(쿠바)',
  '살레',
  '전원주택',
  '키클라데스',
  '주택(그리스)',
  '담무소(이탈리아)',
  '돔하우스',
  '땅속의집',
  '농장 체험 숙박',
  '하우스 보트',
  '오두막',
  '등대',
  '팬션(한국)',
  '마차(영국, 프랑스)',
  '초소형주택',
  '타운하우스',
  '트룰로(이탈리아)',
  '저택',
];

//* 별채 건물 유형
export const secondaryUnitBuildingTypeList = [
  '게스트용 별채',
  '게스트 스위트',
  '농장 체험 숙박',
];

//* 독특한숙소 건물 유형
export const uniqueSpaceBuildingTypeList = [
  '헛간',
  '보트',
  '버스',
  '캠핑카',
  '캠핑장',
  '성',
  '동굴',
  '돔하우스',
  '땅속의 집',
  '농장 체험 숙박',
  '하우스 보트',
  '오두막',
  '이글루',
  '섬',
  '등대',
  '펜션(한국)',
  '비행기',
  '마차(영국, 프랑스)',
  '텐트',
  '초소형 주택',
  '티피',
  '기차',
  '트리하우스',
  '풍차',
  '유르트',
];

//* B&B 건물유형
export const bnbBuildingTypeList = [
  'B&B',
  '카사 파르티쿨라르(쿠바)',
  '농장 체험 숙박',
  '민수 (타이완)',
  '산장',
  '료칸(일본)',
];

//* 부티크 호텔 건물유형
export const boutiquesHotelBuildingTypeList = [
  '부티크 호텔',
  '아파트 호텔',
  '헤리티지 호텔(인도)',
  '호스텔',
  '호텔',
  '산장',
  '리조트',
  '레지던스',
  '객잔(중국)',
];

export const disabledLargeBuildingTypeOptions = ['하나를 선택해주세요.'];

export const roomTypeRadioOptions = [
  {
    label: '집 전체',
    value: 'entire',
    description:
      '게스타가 숙소 전체를 다른 사람과 공유하지 않고 단독으로 이용합니다. 일반적으로 침실, 욕실, 부엌이 포함됩니다.',
  },
  {
    label: '개인실',
    value: 'private',
    description:
      '게스트에게 개인 침실이 제공됩니다. 침실 이외의 공간은 공용일 수 있습니다.',
  },
  {
    label: '다인실',
    value: 'public',
    description:
      '게스트는 개인 공간 없이, 다른 사람과 함께 쓰는 침실이나 공용공간에서 숙박합니다.',
  },
];

export const isSetUpForGuestOptions = [
  {
    label: '예, 게스트용으로 따로 마련된 숙소입니다.',
    value: true,
  },
  {
    label: '아니오, 제 개인 물건이 숙소에 있습니다.',
    value: false,
  },
];
