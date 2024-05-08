import React, { useRef, useState } from 'react';
import { ImageField, RangeField } from '../ui/FormFields';
import AvatarEditor from 'react-avatar-editor';
import { AvatarWidth } from '../utils';
import RotationIcon from '../../images/pages/Rotation.svg';

const AvatarProps = {
  BORDER: 10,
  COLOR: [63, 151, 231, 1],
  BACKGROUND_COLOR: '#B3B3B3',
  SCALE: 1,
  MIN_SCALE: 1,
  MAX_SCALE: 5,
  SCALE_STEP: 0.1,
  ROTATION_ANGLE: 0,
  ROTATION_STEP: 90
};

const RotationButton: React.FC<{
  angle: number,
  rotate: () => void
}> = ({angle, rotate}) => (
  <button className={`secondary-button rotation-button ${angle > 0 ? 'right' : 'left'}`} onClick={(evt) => {
    evt.preventDefault();
    rotate();
  }}>
    <img className={angle < 0 ? 'rotation-reversed' : 'rotation-original'} src={RotationIcon} alt={`Повернуть на ${angle} градусов`}/>
  </button>
);

const AvatarField: React.FC<{
  accountAvatar: string,
  changeAccount: (resultImage: string) => void
}> = ({accountAvatar, changeAccount}) => {
  const [imageUrl, setImageUrl] = useState<string>('');
  const [scale, setScale] = useState<number>(AvatarProps.SCALE);
  const [angle, setAngle] = useState<number>(AvatarProps.ROTATION_ANGLE);
  const avatar = useRef<AvatarEditor>(null);

  if(!imageUrl) {
    return (
      <ImageField
        fieldHeader='Добавить фото'
        image={accountAvatar}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          if(evt.target.files !== null && evt.target.files.length > 0) {
            setImageUrl(URL.createObjectURL(evt.target.files[0]))
          }
        }}/>
    );
  }

  console.log(scale);

  return (
    <div className='avatar-editor'>
      <AvatarEditor
        ref={avatar}
        image={imageUrl}
        width={AvatarWidth.DESKTOP}
        height={AvatarWidth.DESKTOP}
        scale={scale}
        border={AvatarProps.BORDER}
        color={AvatarProps.COLOR}
        backgroundColor={AvatarProps.BACKGROUND_COLOR}
        rotate={angle}
        />

      <RangeField
        minValue={AvatarProps.MIN_SCALE}
        maxValue={AvatarProps.MAX_SCALE}
        value={scale}
        step={AvatarProps.SCALE_STEP}
        onChange={(value) => setScale(value)}/>

      <div className='rotation-buttons'>
        <RotationButton 
          angle={AvatarProps.ROTATION_STEP} 
          rotate={() => setAngle((value) => value + AvatarProps.ROTATION_STEP)}/>
        <RotationButton 
          angle={-AvatarProps.ROTATION_STEP} 
          rotate={() => setAngle((value) => value - AvatarProps.ROTATION_STEP)}/>
      </div>

      <div className='buttons-group'>
        <button 
          className='main-button'
          onClick={() => {
            setImageUrl('');
            changeAccount(!avatar.current ? imageUrl : avatar.current.getImage().toDataURL());
        }}>
          Сохранить фото
        </button>
        <button 
          className='secondary-button'
          onClick={() => setImageUrl('')}>
            Удалить фото
        </button>
      </div>
    </div>
  );
};

export default AvatarField;
