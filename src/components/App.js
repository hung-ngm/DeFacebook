import React, { useState, useEffect } from 'react';
import { Navbar } from './topbar/Navbar';
import { Post } from './post/Post';
import { Share } from './share/Share';
import Web3 from 'web3';
import DeFacebook from '../abis/DeFacebook.json';

function App() {

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [account, setAccount] = useState({});
  const [deFacebook, setDeFacebook] = useState({})
  const [postsCount, setPostsCount] = useState({});

  useEffect(() => {
    (async function () {
      await loadWeb3();
      await loadBlockchainData();
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
    setAccount(accounts[0]);
    const networkId = await web3.eth.net.getId();
    const networkData = DeFacebook.networks[networkId];
    if (networkData) {
      const deFacebook = new web3.eth.Contract(DeFacebook.abi, networkData.address);
      setDeFacebook(deFacebook);
      const postsCount = await deFacebook.methods.postsCount().call();
      setPostsCount(postsCount);

      for(var i = 1; i <= postsCount; i++) {
        const post = await deFacebook.methods.posts(i).call();
        console.log(post);
        setPosts((oldPosts) => [...oldPosts, post]);
      }


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
      <Share createPost={createPost} account={account} />
      <Post tipPost={tipPost} posts={posts} setPosts={setPosts} />
    </div>
  );
}

export default App;
