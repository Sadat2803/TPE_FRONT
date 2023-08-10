import React from "react";
import styled from 'styled-components'


const Styles = styled.div`

/* Popup style */
.popup-box {
    position: fixed;
    background: #00000050;
    width: 100%;
    height: 50vh;
    top: 0;
    left: 0;
    z-index:1000;
    padding: 10px;

  }
   
  .box {
      
    position: relative;
    width: 25%;
    margin: 0 auto;
    height: auto;
    max-height: 70vh;
    margin-top: calc(100vh - 85vh - 20px);
    border-radius: 6px;
    padding: 20px;
    border: 1px solid #999;
    background: #E4EAF0 0% 0% no-repeat padding-box;
    box-shadow: 0px 3px 6px #0000001A;
    opacity: 1;
  }
   
  .close-icon {
    content: 'x';
    cursor: pointer;
    position: fixed;
    right: calc(36% - 10px);
    top: calc(100vh - 85vh - 33px);
    background: #ededed;
    width: 25px;
    height: 25px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    border: 1px solid #999;
    font-size: 20px;
  }`;





const Vehicule = props => {
    return (
        <Styles>
                  <div className="popup-box">
        <div className="box">
          <span className="close-icon" onClick={props.handleClose}>x</span>
          {props.content}
        </div>
      </div>

        </Styles>
    );
  };
   
  export default Vehicule;
  