"use client";

import { Input } from "./shadcn/input"
import { Button } from "./shadcn/button"
import Form from 'next/form';

export default function Search() {
    function handleSubmit() {
        console.log("HOWDY")
    }

    return (
        <Form 
            action={handleSubmit}
            className="flex w-full max-w-xl items-center space-x-2"
        >
            <Input type="search" placeholder="keywords" />
            <Button type="submit">Search</Button>
        </Form>
    )
}