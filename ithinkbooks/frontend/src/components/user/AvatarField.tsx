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
  changeAccount: (resultImage: string, data: FormData) => void
}> = ({accountAvatar, changeAccount}) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [scale, setScale] = useState<number>(AvatarProps.SCALE);
  const [angle, setAngle] = useState<number>(AvatarProps.ROTATION_ANGLE);
  const avatar = useRef<AvatarEditor>(null);

  if(!image) {
    return (
      <ImageField
        fieldHeader='Добавить фото'
        image={accountAvatar}
        onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
          if(evt.target.files !== null && evt.target.files.length > 0) {
            setImage(evt.target.files[0])
          }
        }}/>
    );
  }

  return (
    <div className='avatar-editor'>
      <AvatarEditor
        ref={avatar}
        image={image}
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
            avatar.current?.getImage().toBlob((blob) => {
              if(!blob) {
                return;
              }

              const file = new FormData();
              file.append('image', blob);

              changeAccount(!avatar.current ? URL.createObjectURL(image) : avatar.current.getImage().toDataURL(), file)
            }, 'images/*', 1);
            setImage(undefined);
        }}>
          Сохранить фото
        </button>
        <button 
          className='secondary-button'
          onClick={() => setImage(undefined)}>
            Удалить фото
        </button>
      </div>
    </div>
  );
};

export default AvatarField;
