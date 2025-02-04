import React, { useState } from "react";
import styled from "styled-components";

export default function OT(){
    const [stage, setStage] = useState(0);

    const renderOT =()=>{
        switch(stage){
            case 0 :
                return(
                    <div>
                        <span></span>
                    </div>
                );

        }
    }
    
    return(
        <div>
            {renderOT()}
        </div>
    );
}