import { useEffect, useState, useRef, type Dispatch, type SetStateAction  } from "react";
import { useUserInfo } from "../../stores/userStore";
import { useNavigate } from "react-router-dom";
import styles from "./DetailApartInfo.module.scss"
import { useChat } from "../../hooks/useChat";


const ApplyChatting = () => {
    const navigate = useNavigate();
    const user = useUserInfo();
    const [userName, setUserName] = useState<string>();
    const [userUrl, setUserUrl] = useState<string>();
    const [userId, setUserId] = useState<number>(-1);
    const [isClick, setIsClick] = useState<boolean>(false);
    const {sendChatRequestAction} = useChat();
    const [content, setContents] = useState<string>('');

    useEffect(() => {
        
        if (!user.isLogin) {
            navigate("/login", { replace: true });
        }

        let id = localStorage.getItem("ChatID");
        let name = localStorage.getItem("ChatName");
        let url = localStorage.getItem("ChatUrl");

        console.log(id+" : "+name+" : "+url)

        if(name && url && id) {
            setUserName(name);
            setUserUrl(url);
            setUserId(Number.parseInt(id));
        }
        else
        {
            alert('정보가 부족합니다.');
            navigate("/community/feed", { replace: true });
        }
    });
    return(
        <>
          <div className={[styles.register, styles.dimmed].join(" ")} style={{zIndex:'0'}}>
          </div>
          {
            isClick ?
            <div className={styles.register} style={{placeItems:'center', display:'grid'}}>
                <div style={{display:'grid', placeItems:'center', width:'330px', height:'508px', backgroundColor:'white', padding:'20px',borderRadius:'12px'}}>
                    <p>{userName}님에게 대화신청</p>
                    <p style={{width:'290px', textAlign:'center', fontSize:'13px', color:'#999999'}}>대화는 상대방이 수락하면 시작됩니다.<br></br>불편한 대화가 이어질 경우, 대화가 종료될 수 있으니 함께 편안한 대화를 나눌 수 있도록 배려해주세요.
                    </p>
                    <textarea value={content} onChange={(e) => setContents(e.target.value)} style={{width:'290px', height:'292px', padding:'12px 15px', borderRadius:'6px', resize:'none'}} placeholder="내용을 입력해주세요."/>
                    <div style={{justifyContent:'space-between'}}>
                        <button className={styles.bluebtn} style={{width:'139px', marginRight:'12px'}}
                                onClick={() => {setIsClick(false);}}>취소</button>
                        <button className={styles.bluebtn} style={{width:'139px'}}
                                onClick={() => {setIsClick(true); sendChatRequestAction(userId, content); navigate("/community/feed", { replace: true });}}>요청</button>
                    </div>
                </div>
            </div>
            :
            <div className={styles.register} style={{placeItems:'center', display:'grid'}}>
                <div style={{display:'grid', placeItems:'center', width:'330px', height:'222px', backgroundColor:'white', padding:'20px',borderRadius:'12px'}}>
                    <img src={userUrl} style={{width:'80px', height:'80px', borderRadius:'50%'}}/>
                    <p>{userName}</p>
                    <div style={{justifyContent:'space-between'}}>
                        <button className={styles.bluebtn} style={{width:'139px', marginRight:'12px'}}
                                onClick={() => {navigate("/community/feed", { replace: true });}}>취소</button>
                        <button className={styles.bluebtn} style={{width:'139px'}}
                                onClick={() => {setIsClick(true);}}>대화신청</button>
                    </div>
                </div>
            </div>
          }
        </>
    );
}

export default ApplyChatting;