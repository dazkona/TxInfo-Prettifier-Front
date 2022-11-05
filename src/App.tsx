import React, { useState, useRef } from 'react';
import './App.css';

import { APIData } from './types';

import Header from './components/Header';
import TransactionDetail from './components/TransactionDetail';
import WealthChanges from './components/WealthChanges';

function App() {
	const inputRef = useRef<HTMLInputElement>(null);
	const [trace, setTrace] = useState<APIData>(() => {return {trace: [], wealthChanges: []}});
	const [decoding, setDecoding] = useState<boolean>(false);

	const handleDecodeClick = () => {
		if(!decoding)
		{
			setDecoding(true);
			if(inputRef && inputRef.current)
			{
				const txHash = inputRef.current.value; 
				if(txHash !== "")
				{
					if(/^0x([A-Fa-f0-9]{64})$/.test(txHash))
					{
						setTrace({trace: [], wealthChanges: []});

						fetch('https://txinfo.dazkona.com/api/tx/'+txHash)
							.then((response) => response.json())
							.then((response) => {
								setTrace(response.data);
								setDecoding(false);
							})
							.catch(err => {
								console.error(err);
								setDecoding(false);
							});
					}
					else
					{
						// Feedback: invalid format
					}
				}
				else
				{
					// Feedback: empty tx hash field
				}
			}
			else
			{
				// weird case
			}
		}
	}

	const buttonTxt = decoding ? "Decoding..." : "Decode";

	return (
		<div className="App">
			<div className='mainContent'>
				<Header />
				<div className='mCUserInput'>
					<input type="text" className="txtHash" 
						name="txtHash" id="txtHash" 
						placeholder="transaction hash"
						ref={inputRef} />
					<button type="button" name="btnSend" id="btnSend" onClick={handleDecodeClick}>{buttonTxt}</button>
					<div className='userInputFeedback'></div>
				</div>
				<WealthChanges
					info={trace.wealthChanges} />
				<TransactionDetail 
					trace={trace.trace} />
				<div className='mCText'>
					<div className='mCTTitle'>About TxInfo</div>
					<div className='mCTBody'>
						<ul>
							<li>Frontend and Backend developed by Daniel Azcona Coya as an exercise to better understand the internal process behind Ethereum smart contract transactions.</li>
							<li>It's an Open Source project so everyone is invited to download, learn, use and improve.</li>
							<li>Any suggestion, message or idea will be welcome.</li>
							<li>Sadly I have to set up a limit on Backend calls because some of the API services I use have the same restrictions for free accounts.</li>
						</ul>
					</div>
				</div>
				<div className='mCText'>
					<div className='mCTTitle'>Appreciations</div>
					<div className='mCTBody'>
						<ul>
							<li><a href="https://archivenode.io/" target="_blank" rel="noreferrer">archivenode.io</a>, for allowing me to use their free Ethereum archive node.</li>
							<li><a href="https://etherscan.io/" target="_blank" rel="noreferrer">etherscan.io</a> API, for allowing us to get smart contract ABI information.</li>
							<li><a href="https://tx.eth.samczsun.com/" target="_blank" rel="noreferrer">tx.eth.samczsun.com</a>, <a href="https://ethtx.info/" target="_blank" rel="noreferrer">ethtx.info</a>, <a href="https://phalcon.blocksec.com/" target="_blank" rel="noreferrer">phalcon.blocksec.com</a>, and other projects, to show us how important and necessary these kind of tools are.</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
