import { useState } from "react";
import { Row, Button, Modal, Space, Typography } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import css from "../../../styles/component.module.css";
import SwipingCards from "./CardMedia";
import {  InfoCircleOutlined } from '@ant-design/icons';

const { Text } = Typography;

const style = {
     
    height:200,
    width:500,
    display:"flex",
    justifyContent:"center",
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 5,
    p: 4,
  };


const ProfileCards = ({ profiles, handleSwipe }) => {
    
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);

    // ant design

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
      };
    
      const handleOk = () => {
        setIsModalVisible(false);
      };
    
      const handleCancel = () => {
        setIsModalVisible(false);
      };


    return (

        
        <div className={css.swipingList}>

            
            


            {profiles
                .slice()
                .reverse()
                .map(({ imgUrl, name,overView,releaseDate}, index) => {

                    
                  console.log(releaseDate,"mum")            
                    return (
                    
                        <SwipableWrapper
                        
                            key={name}
                            className={css.swipingWrapper}
                            onSwipeLeft={() => handleSwipe("skip")}
                            onSwipeRight={() => handleSwipe("like")}

                            
                        >

                            <div className={css.profileCard} style={{ backgroundImage: `url(${imgUrl})` }}>

                                <div className={css.profileCardDescription}>
                                    <Text
                                        className={css.profileCardDescriptionTitle}
                                        strong
                                    >{`${name}`}</Text>

                                </div>

                                
                            </div>
                                <span className={`${css.swipingMessage} ${css.likeMessage}`}>
                                    LIKE
                                </span>

                                
                                <span className={`${css.swipingMessage} ${css.skipMessage}`}>
                                    SKIP

                                </span>

                
               
               
                <Button type="default"  style={{ marginTop :9}}  onClick={showModal}>
                        Details
                    </Button>

                    {/* When I use marginTop it moves it away, marginBottom doesn't, but the more you move the button away the less responsive it becomes? 
                        Details
                   / > */}
                    <Modal title="Details" visible={isModalVisible} bodyStyle={{height: '200px'}} cancelButtonProps={{ style: { display: 'none' } }} onOk={handleCancel} >
                         
                      <p>{releaseDate}</p>
                      <br></br>
                      <p>{overView}</p>
                        
                    </Modal>
                                
                        </SwipableWrapper>                    

                    );

            })}

            <Row justify="center" className={css.toolbar}>
            <Space size={64}>
                <Button
                danger
                className={css.toolbarButton}
                size="large"
                shape="circle"
                icon={<CloseOutlined size="large" />}
                onClick={() => handleSwipe("skip")}
                />
                <Button
                className={css.toolbarButton}
                shape="circle"
                icon={<CheckOutlined style={{ color: "#52c41a" }} />}
                onClick={() => handleSwipe("like")}
                />
            </Space>
            </Row>
        </div>
    );
};

function getMovingStyle({ x, y, rotate, opacity = 1 }) {
    return {
        transform: `translate3d(${x}px, ${y}px, 0px) rotate(${rotate}deg) scale(1,1)`,
        transformOrigin: "center center",
        opacity: opacity,
    };
}

function getXYFromTransformCss(transformCss) {
    const xyRegex = /(-|)\d{0,4}px/g;
    const [xInPixel, yInPixel] = transformCss.match(xyRegex);
    return {
        x: Number(xInPixel.replace("px", "")),
        y: Number(yInPixel.replace("px", "")),
    };
}

const SwipableWrapper = ({ children, style, onSwipeLeft, onSwipeRight, ...otherProps }) => {
  
  
    const initialStyle = { transform: `translate3d(0px, 0px, 0px) rotate(0deg) scale(1,1)`};
    const [initialXY, setInitialXY] = useState(null);

    const handleMouseDown = ({ pageY, pageX }) => {
        setInitialXY({ x: pageX, y: pageY });
    };

    const handleMouseMove = ({ currentTarget, pageX, pageY }) => {
        
        if (!initialXY) return;

        const swipingEl = currentTarget;
        const changedXY = {
            x: pageX - initialXY.x,
            y: pageY - initialXY.y,
            rotate: (pageX - initialXY.x) / 10,
        };

        const newStyleCss = getMovingStyle(changedXY);
            Object.entries(newStyleCss).forEach(([key, value]) => {
                swipingEl.style[key] = value;
        });

        const calculatedMessageOpacity = Math.abs(changedXY.x) / 100;
        const messageElIndex = changedXY.x >= 0 ? 1 : 2;
        swipingEl.children[messageElIndex].style.opacity = calculatedMessageOpacity < 1 ? calculatedMessageOpacity : 1;
    };

    const handleMouseUp = ({ currentTarget }) => {
        setInitialXY(null);
        
        const swipingEl = currentTarget;
        const { x } = getXYFromTransformCss(swipingEl.style.transform);
        const shouldRemoveCard = Math.abs(x) >= 100;
        
        if (shouldRemoveCard) {
            swipingEl.style.opacity = 0;
            setTimeout(() => {
                x >= 0 ? onSwipeRight() : onSwipeLeft();
            }, 500);
        } else {
            swipingEl.style.transform = initialStyle.transform;
            const [_cardEl, skipMessageEl, likeMessageEl] = swipingEl.children;
            skipMessageEl.style.opacity = 0;
            likeMessageEl.style.opacity = 0;
        }
    };

    return (
        <div
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            style={{ ...style, transform: initialStyle.transform }}
            {...otherProps}
        >
            {children}
        </div>
    );
};

export default ProfileCards;