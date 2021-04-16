import React, { useCallback } from 'react';
export default function Web3Data(props) {
const { web3Context } = props;
const { networkId, networkName, accounts, providerName } = web3Context;
const requestAuth = async web3Context => {
try {
	await web3Context.requestAuth();
	} catch (e) {
	console.error(e);
	}
};
    
const requestAccess = useCallback(() => requestAuth(web3Context), []);

return (
<div>
<h3> {props.title} </h3>
	<div>
    Network: {networkId ? `${networkId} – ${networkName}` : 'No connection'}
	</div>
	<div>
	Your address: {accounts && accounts.length ? accounts[0] : 'Unknown'}
	</div>
	<div>
	Provider: {providerName}
	</div>

	{accounts && accounts.length ? (
	<div>
	Accounts & Signing Status: Access Granted
	</div>
	) : !!networkId && providerName !== 'infura' ? (
	<div>
	<button onClick={requestAccess}>Request Access</button>
	</div>
	) : (
	<div></div>
	)}
</div>
);
}