import { BaseApartInfo } from "../../model/BaseApartInfoModel";
import styles from './apart-list.module.scss'

interface ApartProps{
  id?: string;
  //onClickCard : (e: React.MouseEvent<HTMLDivElement>) => void;
  element : BaseApartInfo;
}

const ApartList: React.FC<ApartProps> = ({ element }) => {
  return (
    <div style={{cursor:'pointer', width:'150px', marginBottom:'8px', marginTop:'8px', display:'flex', flexDirection:'row'}} onClick={onClickCard}>
      <div style={{position:'relative', borderRadius:'8px'}}>
        <img style={{width:'62px', height:'62px', borderRadius:'8px'}} src={element.picture}/>
      </div>
      <div>
        <p style={{fontSize:'14px', fontWeight:'600', color:'rgba(151, 187, 255, 1)'}}>{element.apartName}</p>
        <p style={{fontSize:'14px', color:'rgba(17, 17, 17, 1)'}}>{element.apartDetailName}</p>
        <div className={`${styles["div-detail-info"]}`}>
          <p>총{element.totalHouseHolds}세대</p>
          <p>|</p>
          <p>{element.houseSize}평</p>
          <p>|</p>
          <p>{element.moveVailableMonth}월 입주</p>
        </div>
      </div>
    </div>
  );
};

export default ApartList;