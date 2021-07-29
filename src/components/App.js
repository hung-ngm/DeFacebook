import React, { useState, useEffect } from 'react';
import { Navbar } from './topbar/Navbar';
import { Post } from './post/Post';
import { Share } from './share/Share';
import Web3 from 'web3';
import DeFacebook from '../abis/DeFacebook.json';
import ipfsClient from 'ipfs-http-client';

function App() {
  // const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

  const [post, setPost] = useState({
    like: 10,
    date: '27/7/2021',
    desc: 'Beautiful',
    photo: '',
    comment: 'This is very good'
  });

  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState({});
  const [deFacebook, setDeFacebook] = useState({})
  const [postsCount, setPostsCount] = useState({});

  useEffect(() => {
    (async function () {
      try {
        await loadWeb3();
        await loadBlockchainData();
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  const loadWeb3 = async () => {
    if(window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      alert('Non Ethereum browser detected. Should use Metamask');
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const accounts = await web3.eth.getAccounts();
    setAccount({ account: accounts[0]} );
    const networkId = await web3.eth.net.getId();
    const networkData = DeFacebook.networks[networkId];
    if (networkData) {
      const deFacebook = web3.eth.Contract(DeFacebook.abi, networkData.address);
      setDeFacebook({ deFacebook });
      const postsCount = await deFacebook.methods.postsCount().call();
      setPostsCount({ postsCount });
    } else {
      alert('DeFacebook not connected to network');
    }
  }

  const createPost = (title, body) => {
    setLoading(true);
    deFacebook.methods.createPost(title, body).send({ from: account }).once('receipt', (receipt) => {
      setLoading(false);
    })
  }

  const tipPost = (id, tipAmount) => {
    setLoading(true);
    deFacebook.methods.tipPost(id).send({ from: account, value: tipAmount }).once('receipt', (receipt) => {
      setLoading(false);
    })
  }

  return (
    <div className="App">
      <Navbar />
      <Share />
      <Post post={post} />
    </div>
  );
}

export default App;
