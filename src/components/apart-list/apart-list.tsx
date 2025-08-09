import { useId } from 'react';
import { BaseApartInfo } from "../../model/BaseApartInfoModel";
import styles from './apart-list.module.scss'
import type { ChangeEvent } from 'react';

interface ApartProps{
  id?: string;
  btnType : 'radio' | 'none' | 'delete';
  element : BaseApartInfo;
  selected: boolean;
  onSelect: (id:number) => void;
}

const ApartInfo = ({element} : {element:BaseApartInfo}) =>
{
  return(
    <>
      <div style={{cursor:'pointer', marginBottom:'8px', marginTop:'8px', display:'flex', flexDirection:'row'}}>
        <div style={{position:'relative', borderRadius:'8px', marginRight:'12px'}}>
          <img style={{width:'62px', height:'62px', borderRadius:'8px'}} src={element.thumbnailFileUrl ? `https://s3.ap-northeast-2.amazonaws.com/danjitalk/${element.thumbnailFileUrl}` : 'https://placehold.co/64x64'}/>
        </div>
        <div style={{display:'inline-grid', marginTop:'4px', marginBottom:'4px'}}>
          <p style={{fontSize:'14px', fontWeight:'600', color:'rgba(17, 17, 17, 1)'}}>{element.name}</p>
          <p style={{fontSize:'14px', color:'rgba(17, 17, 17, 1)'}}>{element.region}</p>
          <div className={`${styles["div-detail-info"]}`}>
            <p>아파트 {element.totalUnit.toLocaleString()} 세대</p>
            <p> | </p>
            <p>{element.buildingCount.toLocaleString()} 동</p>
          </div>
        </div>
      </div>
    </>

  );
}

const ApartRadio = ({ element, selected, onSelect } : {element:BaseApartInfo, selected:boolean, onSelect:(id:number) => void}) => {
  const generateId = useId();

  console.log(element);

  return (
    <div className={`${styles.radio} ${selected ? 'selected' : ''}}`} style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
      <label htmlFor={generateId} style={{width:'100%'}}>
        <ApartInfo element={element}/>
      </label>
      <input className={styles.input} checked={selected} onChange={() => {onSelect(element.id);}} type="radio" name="apartmentlist" id={generateId} value={element.id}/>
      <label
        id={`${generateId}-label`}
        htmlFor={generateId}
        className={styles.label}
      >
        <span className={styles.checkmark}></span>
      </label>
    </div>
  );
};

const ApartDelete = ({element, onSelect} : {element:BaseApartInfo, onSelect:(id:number) => void}) => {
  return(
    <>
      <div style={{display:'flex', width:'100%', justifyContent:'space-between'}}>
        <ApartInfo element={element}/>
        <div style={{display:'flex', alignItems:'center'}}>
          <button style={{width:'24px', height:'24px'}} onClick={()=>{onSelect(element.id);}}><img />X</button>
        </div>
      </div>
    </>
  );
}

const ApartList: React.FC<ApartProps> = ({ element, btnType, selected, onSelect }) => {
  return (
    <div>
      {btnType === 'radio' && (
        <ApartRadio element={element} selected={selected} onSelect={onSelect} />
      )}
      {btnType === 'delete' && (
        <ApartDelete element={element} onSelect={onSelect}/>
      )}
      {btnType === 'none' && <span>{element.name}</span>}
    </div>
  );
};

export default ApartList;