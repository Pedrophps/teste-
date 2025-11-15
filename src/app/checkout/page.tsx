import { CheckoutClient } from "@/components/checkout/checkout-client";
import { Suspense } from "react";

export default function CheckoutPage() {
    return (
        <div>
            <h1 className="text-4xl font-bold font-headline text-center mb-8">Checkout</h1>
            <Suspense fallback={<div>Loading checkout...</div>}>
                <CheckoutClient />
            </Suspense>
        </div>
    );
}
