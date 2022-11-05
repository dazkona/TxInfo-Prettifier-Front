import { ethers } from "ethers";
import { WCProps, TraceWealthChange, WLProps } from "../types";

//-------------------------------------------------------------------
function WealthLine(props: WLProps) 
{
	const {item} = props;

	var amount = (item.amount) as string;
	var tokenUnit = "Eth";
	if(item.token.units !== "")
	{
		tokenUnit = item.token.units;
	}
	if(typeof item.amount === 'object')
	{
		const bnValue = ethers.BigNumber.from(item.amount);
		amount = ethers.utils.formatUnits(bnValue, item.token.decimals);
	}	
	
	return (
		<div className="wealthLine">
			<div className="wLFrom wlElement">{item.from.address}</div>
			<div className="wLArrow wlElement">{"->"}</div>
			<div className="wLTo wlElement">{item.to.address}</div>
			<div className="wLAmount wlElement">{amount}</div>
			<div className="wLToken wlElement">{tokenUnit}</div>
		</div>
	);
}

//-------------------------------------------------------------------
export default function WealthChanges(props: WCProps)
{
	const {info} = props;
	return (
		<>
			<div className="mcTitle">Token transfers</div>
			<div className='mCWealthChanges'>
				{
					info.map((infoLine, i) => {
						return (
							<WealthLine item={infoLine} key={i} />
						)
					})
				}
			</div>
		</>
	);
}