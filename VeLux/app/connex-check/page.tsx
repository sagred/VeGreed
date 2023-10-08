"use client";
import { ProviderWeb3 } from "@vechain/web3-providers-connex";
import { Web3 } from "web3";

import { Connex } from "@vechain/connex";
import { useMemo, useEffect, useState } from "react";
import { Driver, SimpleNet } from "@vechain/connex-driver";
import { Framework } from "@vechain/connex-framework";

const createTokenabi = {
  inputs: [
    {
      internalType: "string",
      name: "tokenURI",
      type: "string",
    },
  ],
  name: "createToken",
  outputs: [
    {
      internalType: "uint256",
      name: "",
      type: "uint256",
    },
  ],
  stateMutability: "nonpayable",
  type: "function",
};

const contractAddress = "0x0CB0233384A5152321Ce748D316d2835245392B5";

export default function SimpleComponentWithConnex() {
  const [connexInstance, setConnexInstance] = useState<Connex>();
  const [account, setAccount] = useState<any>();
  const [createTokenMethod, setCreateTokenMethod] = useState<any>();

  async function setupConnex() {
    const { Connex } = require("@vechain/connex");
    const connex = new Connex({
      node: "https://vethor-node-test.vechaindev.com/",
      network: "test",
    });
    // setConnexInstance(connex);
    const createTokenMethod = connex.thor
      .account(contractAddress)
      .method(createTokenabi);
    const tx = createTokenMethod.asClause("https://www.google.com");

    connex.vendor
      .sign("tx", [tx])
      .request()
      .then((res: any) => {
        console.log(res);
      });
  }

  useEffect(() => {
    setupConnex().then(() => {
      console.log("Connex is ready");
      // setAccount(
      //   connexInstance?.thor.account(
      //     "0x3c897d3b12a828A33CD0467a131459DB9b5548A1",
      //   ),
      // );
    });
  }, []);

  return (
    <>
      <div>
        <p>hello</p>
      </div>
    </>
  );
}
