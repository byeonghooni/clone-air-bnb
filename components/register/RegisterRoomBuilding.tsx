import React, { useMemo } from 'react';
import styled from 'styled-components';
import palette from '../../styles/palette';
import Selector from '../common/Selector';
import {
  disabledLargeBuildingTypeOptions,
  isSetUpForGuestOptions,
  largeBuildingTypeList,
  roomTypeRadioOptions,
} from '../../lib/staticData';
import { useSelector } from '../../store';
import { useDispatch } from 'react-redux';
import { registerRoomActions } from '../../store/registerRoom';
import RadioGroup from '../common/RadioGroup';
import RegisterRoomFooter from './RegisterRoomFooter';

const Container = styled.div`
  padding: 62px 30px 100px;
  h2 {
    font-size: 19px;
    font-weight: 800;
    margin-bottom: 56px;
  }
  h3 {
    font-size: 14px;
    font-weight: bold;
    color: ${palette.gray_76};
    margin-bottom: 6px;
  }
  .register-room-building-selector-wrapper {
    width: 320px;
    margin-bottom: 32px;
  }
  .register-room-type-radio {
    max-width: 485px;
    margin-bottom: 50px;
  }
  .register-room-is-setup-for-guest-radio {
    margin-bottom: 50px;
  }
`;

const RegisterRoomBuilding: React.FC = () => {
  const dispatch = useDispatch();

  const largeBuildingType = useSelector(
    (state) => state.registerRoom.largeBuildingType,
  );
  const onChangeLargeBuildingType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(registerRoomActions.setLargeBuildingType(event.target.value));
  };

  const buildingType = useSelector((state) => state.registerRoom.buildingType);
  const onChangeBuildingType = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    dispatch(registerRoomActions.setBuildingType(event.target.value));
  };

  const roomType = useSelector((state) => state.registerRoom.roomType);
  const onChangeRoomType = (value: 'entire' | 'private' | 'public') => {
    dispatch(registerRoomActions.setRoomType(value));
  };

  const isSetUpForGuest = useSelector(
    (state) => state.registerRoom.isSetUpForGuest,
  );
  const onChangeIsSetUpForGuest = (value: boolean) => {
    dispatch(registerRoomActions.setIsSetUpForGuest(value));
  };

  const detailBuildingOptions = useMemo(() => {
    switch (largeBuildingType) {
      case '아파트': {
        const { apartmentBuildingTypeList } = require('../../lib/staticData');
        dispatch(
          registerRoomActions.setBuildingType(apartmentBuildingTypeList[0]),
        );
        return apartmentBuildingTypeList;
      }
      case '주택': {
        const { houseBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBuildingType(houseBuildingTypeList[0]));
        return houseBuildingTypeList;
      }
      case '별채': {
        const {
          secondaryUnitBuildingTypeList,
        } = require('../../lib/staticData');
        dispatch(
          registerRoomActions.setBuildingType(secondaryUnitBuildingTypeList[0]),
        );
        return secondaryUnitBuildingTypeList;
      }
      case '독특한 숙소': {
        const { uniqueSpaceBuildingTypeList } = require('../../lib/staticData');
        dispatch(
          registerRoomActions.setBuildingType(uniqueSpaceBuildingTypeList[0]),
        );
        return uniqueSpaceBuildingTypeList;
      }
      case 'B&B': {
        const { bnbBuildingTypeList } = require('../../lib/staticData');
        dispatch(registerRoomActions.setBuildingType(bnbBuildingTypeList[0]));
        return bnbBuildingTypeList;
      }
      case '부티크 호텔': {
        const {
          boutiquesHotelBuildingTypeList,
        } = require('../../lib/staticData');
        dispatch(
          registerRoomActions.setBuildingType(
            boutiquesHotelBuildingTypeList[0],
          ),
        );
        return boutiquesHotelBuildingTypeList;
      }
      default:
        return [];
    }
  }, [largeBuildingType]);

  const isValid = useMemo(() => {
    return !(
      !largeBuildingType ||
      !buildingType ||
      !roomType ||
      isSetUpForGuest === null
    );
  }, [largeBuildingType, buildingType, roomType, isSetUpForGuest]);

  return (
    <Container>
      <h2>등록할 숙소 종류는 무엇인가요?</h2>
      <h3>1단계</h3>
      <div className='register-room-building-selector-wrapper'>
        <Selector
          type='register'
          defaultValue='하나를 선택해주세요.'
          disabledOptions={disabledLargeBuildingTypeOptions}
          isValid={!!largeBuildingType}
          label='우선 범위를 좁혀볼까요?'
          options={largeBuildingTypeList}
          value={largeBuildingType || undefined}
          onChange={onChangeLargeBuildingType}
        />
      </div>
      <div className='register-room-building-selector-wrapper'>
        <Selector
          type='register'
          disabled={!largeBuildingType}
          isValid={!!buildingType}
          label='건물 유형을 선택하세요.'
          options={detailBuildingOptions}
          value={buildingType || undefined}
          onChange={onChangeBuildingType}
        />
      </div>
      {buildingType && (
        <>
          <div className='register-room-type-radio'>
            <RadioGroup
              label='게스트가 묵게 될 숙소 유형을 골라주세요.'
              isValid={!!roomType}
              value={roomType}
              options={roomTypeRadioOptions}
              onChange={onChangeRoomType}
            />
          </div>
          <div className='register-room-is-setup-for-guest-radio'>
            <RadioGroup
              label='게스트만을 사용하도록 만들어진 숙소인가요?'
              isValid={isSetUpForGuest !== null}
              options={isSetUpForGuestOptions}
              value={isSetUpForGuest}
              onChange={onChangeIsSetUpForGuest}
            />
          </div>
        </>
      )}
      <RegisterRoomFooter
        isValid={isValid}
        prevHref='/'
        nextHref='/room/register/bedrooms'
      />
    </Container>
  );
};

export default RegisterRoomBuilding;
