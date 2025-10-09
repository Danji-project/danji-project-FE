import type { Dispatch, SetStateAction } from "react";
import type { CommentBase } from "../../../model/BaseCommentModel";
import React, { useEffect, useRef, useState } from "react";

const CommentBox = ({data, setPerentID, handleMenuItemClick} : 
    { data: CommentBase, setPerentID: () => void ; 
        handleMenuItemClick : ({index, comment}:{index: number; comment:CommentBase;}) => void }) => {
    const [menuVisible, setMenuVisible] = useState(false);
    const [menuPosition, setMenuPosition] = useState<{ top: number; left: number } | null>(null);
    const menudivRef = useRef<HTMLDivElement | null>(null); // 메뉴 참조
    const menuRef = useRef<HTMLUListElement | null>(null);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            // 메뉴 위치 계산
            setMenuPosition({
                top: rect.bottom + window.scrollY, // 버튼 아래
                left: rect.left - (rect.width * 5), // 버튼 왼쪽
            });
            setMenuVisible(prev => !prev); // 메뉴 토글
        }
        event.stopPropagation();
    };

    const handleClickOutside = (event: MouseEvent) => {
        // 메뉴 외부 클릭 시 메뉴를 숨김
        if (menuRef.current && !menuRef.current.contains(event.target as Node) && buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
            setMenuVisible(false);
        }
    };

    const handleScroll = () => {
        // 스크롤 시 메뉴 숨김
        setMenuVisible(false);
    };

    // 외부 클릭 감지
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        window.addEventListener('scroll', handleScroll);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <div style={{ minHeight: '80px', marginTop: '20px' }}>
                <div ref={menudivRef} style={{ display: 'flex', marginBottom: '12px', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex' }}>
                        <img src='https://placehold.co/40x40' style={{ borderRadius: '50%', marginRight: '8px' }} />
                        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '3px 0px' }}>
                            <p style={{ fontSize: '12px', fontWeight: '600' }}>{data.commentMemberResponseDto.nickname}</p>
                            <p style={{ fontSize: '12px', color: '#505050' }}>{data.createdAt}</p>
                        </div>
                    </div>
                    {
                        data.isAuthor ?
                            <button ref={buttonRef} type="button" onClick={handleButtonClick}>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    <path d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z" stroke="#999999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                            :
                            <></>
                    }
                    {
                        menuVisible && menuPosition ?
                            <div style={{ display:'flex', position:'fixed', flexDirection:'column', 
                                    top: menuPosition.top,
                                    left: menuPosition.left + 100, 
                                    zIndex: '9999', width: '70px', backgroundColor:'white'}}>
                                <ul ref={menuRef} style={{
                                    position: 'absolute',
                                    width: '70px',
                                    backgroundColor: 'white',
                                    border: '1px solid #EDEDED',
                                    borderRadius: '4px',
                                    listStyle: 'none',
                                    padding: '10px',
                                    margin: 0,
                                    cursor: 'pointer'
                                }}>
                                    <li style={{ fontSize: '15px', width: '49px', borderBottom: '1px solid #EDEDED', padding: '0px 8px 8px 8px', textAlign: 'center', verticalAlign: 'center' }} onClick={() => { handleMenuItemClick({index:1, comment:data}); setMenuVisible(false); }}>수정</li>
                                    <li style={{ fontSize: '15px', width: '49px', padding: '8px 8px 0px 8px', textAlign: 'center', verticalAlign: 'center' }} onClick={() => { handleMenuItemClick({index:2, comment:data}); setMenuVisible(false); }}>삭제</li>
                                </ul>
                            </div>
                            :
                            <></>
                    }
                </div>
                <div style={{ fontSize: '14px', marginBottom: '12px' }}>
                    {data.contents.split('\n').map((line, index) => (
                        <React.Fragment key={index}>
                            {line}
                            {index < data.contents.split('\n').length - 1 && <br />}
                        </React.Fragment>
                    ))}
                </div>
                <div style={{ cursor: 'pointer', fontSize: '12px', color: '#505050' }} onClick={() => { setPerentID(data) }}>
                    댓글쓰기                
                </div>
                {data.childrenCommentDto.map((child, index) => (
                    <div key={index} style={{ marginLeft: '32px' }}>
                        <CommentBox data={child} setPerentID={setPerentID} handleMenuItemClick={handleMenuItemClick} />
                    </div>
                ))}
            </div>
        </>
    );
};

export default CommentBox;
