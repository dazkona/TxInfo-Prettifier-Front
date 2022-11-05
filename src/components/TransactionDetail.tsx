import { ethers } from "ethers";
import { JsxElement } from "typescript";

import {TraceItem, CallInput, OutputParam, TLProps, TraceType, TDProps } from '../types';

//-------------------------------------------------------------------
function renderInputs(item: TraceItem)
{
	if(item.info.inputs)
	{
		return item.info.inputs.map((arg: CallInput, i: number) => {
			var val = arg.value;
			if((arg.type === 'uint256' || arg.type === 'uint112') && arg.value !== undefined)
			{
				const bn = ethers.BigNumber.from(arg.value);
				val = bn.toString();
			}
			else if(arg.type.includes("[]") || arg.type === 'tuple' || typeof arg.value === 'object')
			{
				val = JSON.stringify(arg.value);
			}
			else if(arg.value === true)
			{
				val = "TRUE";
			}
			else if(arg.value === false)
			{
				val = "FALSE";
			}			

			return (
				<div className="tLInputParam" key={i}>
					<div className="tLIPName">{arg.name}</div>
					<div className="tLIPType">{arg.type}</div>
					<div className="tLIPValue">{val}</div>
				</div>
			);
		});					
	}
	else
		return null;
}

//-------------------------------------------------------------------
function renderOutputs(item: TraceItem)
{
	if(item.info.outputs)
	{
		return item.info.outputs.map((arg: OutputParam, i: number) => {
			var val = arg.value;
			if((arg.type === 'uint256' || arg.type === 'uint112') && arg.value !== undefined)
			{
				const bn = ethers.BigNumber.from(arg.value);
				val = bn.toString();
			}
			else if(arg.type.includes("[]"))
			{
				val = JSON.stringify(arg.value);
			}
			else if(arg.value === true)
			{
				val = "TRUE";
			}
			else if(arg.value === false)
			{
				val = "FALSE";
			}

			return (
				<div className="tLOutputParam" key={i}>
					<div className="tLOPName">{arg.name}</div>
					<div className="tLOPType">{arg.type}</div>
					<div className="tLOPValue">{val}</div>
				</div>
			);
		});					
	}
	else
		return null;
}

//-------------------------------------------------------------------
function renderChildrens(item: TraceItem, level: number) 
{
	if(item.nExpectedChildren > 0)
	{
		return item.children.map((childrenItem, i) => {
			return (
				<TraceLine item={childrenItem} level={level+1} key={i} />
			)
		});
	}
	else
		return null;
}

//-------------------------------------------------------------------
function TraceLine(props: TLProps) 
{
	const {item, level} = props;

	var className = "traceLine traceLineLvl"+level;
	var classtLCallType = "tLCallElement tLCallType";
	var classtLContractName = "tLCallElement tLContractName";
	var classtLEthValue = "tLCallElement tLEthValue";
	var ethValue = "";
	
	if(item.type === TraceType.Function || item.type === TraceType.ProxyFunction || item.type === TraceType.UnverifiedFunction)
	{
		if(item.bError)
			className += " traceLineError";

		classtLCallType += " "+item.info.callType;

		const bnEthValue = ethers.BigNumber.from(item.info.value);
		ethValue = ethers.utils.formatEther(bnEthValue);
		if(ethValue !== "0.0")
			classtLEthValue += " tLEthValueWithValue";
	}

	var contractName = item.info.contractName;
	if(contractName.includes("0x"))
		contractName = item.info.contractName.slice(0, 6) + "..." + item.info.contractName.slice(-3);
	else
		classtLContractName += " knownContractName";
	
	return (
		<>
			<div className={className} key={"-1"}>
				<div className={classtLCallType}>{item.info.callType}</div>
				<div className={classtLContractName}>{contractName}</div>
				<div className="tLCallElement tLMethodCalled">{item.info.name}</div>
				<div className="tLCallElement tLInputParameters">{renderInputs(item)}</div>
				<div className={classtLEthValue}>{ethValue}</div>
				<div className="tLCallElement tLCallIcon">{"->"}</div>
				<div className="tLCallElement tLOutputResult">{renderOutputs(item)}</div>
			</div>
			{renderChildrens(item, level)}
		</>
	);
}

//-------------------------------------------------------------------
export default function TransactionDetail(props: TDProps) 
{
	const {trace} = props;
	return (
		<>
			<div className="mcTitle">Transaction details</div>		
			<div className='mCTransactionDetail'>
				{
					trace.map((traceItem, i) => {
						return (
							<TraceLine item={traceItem} level={0} key={i} />
						)
					})
				}
			</div>
		</>
	);
}