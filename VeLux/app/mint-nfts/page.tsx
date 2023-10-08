"use client";
import Image from "next/image";
import Link from "next/link";

import { cn } from "../../lib/utils";
import { buttonVariants } from "../../components/ui/button";
import NFTDetailsCard from "components/mint-nfts/detailsCard";
import UploadImageCard from "components/mint-nfts/uploadImageCard";

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

function MintNFT() {
  return (
    <>
      <div className="container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]">
            <NFTDetailsCard />
            {/* <UserAuthForm /> */}
            <p className="px-8 text-center text-sm text-muted-foreground">
              By minting the product, you agree to our{" "}
              <Link
                href="/terms"
                className="underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
        <div className="lg:p-8">
          <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[600px]">
            <UploadImageCard />
          </div>
        </div>
      </div>
    </>
  );
}

export default MintNFT;
