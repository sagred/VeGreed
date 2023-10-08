"use client";

import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";

export default function NFTDetailsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>NFT Details</CardTitle>
        <CardDescription>Let's get some product details</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="subject">Product Name</Label>
          <Input id="subject" placeholder="Gucci Leather Shoe..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Please include all information relevant about your product."
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="area">SKU</Label>
            <Input id="subject" placeholder="GUC-123" />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="area">Price</Label>
            <Input id="subject" placeholder="$ 1900.00" />
          </div>
        </div>
        <div className="grid gap-2">
          <Label htmlFor="batch-size">Batch Size</Label>
          <Input id="batch-size" placeholder="10000" />
        </div>
      </CardContent>
    </Card>
  );
}
