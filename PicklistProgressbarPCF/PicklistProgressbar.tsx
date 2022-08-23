//React
import {IInputs, IOutputs} from "./generated/ManifestTypes";
import React, { useState, useEffect } from 'react';
import * as ReactDOM from 'react-dom';
import internal from 'stream';
import { isContext } from 'vm';


function PicklistProgressbar(props:any) {

    let optionsMetaData:ComponentFramework.PropertyHelper.OptionMetadata[] = props.context.parameters.picklist_input_property.attributes!.Options;
    let currentValue = props.context.parameters.picklist_input_property.raw;
    const stageStyle1:any = { float:"left", border:"1px solid grey", padding:"10px", overflow:"auto", marginRight:"10px", marginBottom:"20px", scrollbarWidth: "thin", color: "grey" };
    const stageStyleActive:any = { float:"left", border:"2px solid green", padding:"10px", overflow:"auto", marginRight:"10px", marginBottom:"20px", marginTop:"-1px", scrollbarWidth: "thin", color: "green" };
    const arrowStyle:any={marginTop:"15px", marginRight:"10px", float:"left", border: "solid black", "border-width": "0 3px 3px 0", display: "inline-block", padding:"3px", transform:"rotate(-45deg)", "-webkit-transform": "rotate(-45deg)"};

    return (
      <>
        {optionsMetaData.map((item:any, i:number) => (
            <>
                <div style={item.Value==currentValue ? stageStyleActive : stageStyle1}>
                    <p>
                        {item.Label}
                        <br/>
                    </p>
                </div> 
                { i < optionsMetaData.length-1 && <i style={arrowStyle}></i> }
            </>         
        ))}      
      </>
    );
}

export function Render(context:ComponentFramework.Context<IInputs>, container:HTMLDivElement, onChange:any) {
    ReactDOM.render(
            <div><PicklistProgressbar context={context} onChange={onChange} /></div>
        , container
      );
}

