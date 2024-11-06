import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
/* import {
    Select,
} from "@/components/ui/select" */

export default function ElveModal({ isOpen, isClose, onSubmit, initialData }) {
    const [amount, setAmount] = useState(initialData ? initialData.amount.toString() : '')
    const [status, setStatus] = useState(initialData ? initialData.status : '')
    const [email, setEmail] = useState(initialData ? initialData.email : '')

    useEffect(() => {
        if (initialData) {
            setAmount(initialData.amount.toString())
            setStatus(initialData.status)
            setEmail(initialData.email)
        } else {
            setAmount('')
            setStatus('')
            setEmail('')
        }
    }, [initialData])

    const handleSubmit = (e) => {
        e.preventDefault()
        const id = `id_${Date.now()}`
        onSubmit({
            id,
            amount: parseFloat(amount),
            status,
            email,
        })
        isClose()
    }

    return (
        <Dialog open={isOpen} onOpenChange={isClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{initialData ? 'Edit Elve' : '+ New Elve'}</DialogTitle>
                    <DialogDescription>
                        {initialData ? 'Edit the details of the Elve' : 'Add a new Elve'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">
                                Emails
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="col-span-3"
                                required
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Input
                                onChange={(e) => setStatus(e.target.value)}
                                id="status"
                                name="status"
                                className="col-span-3"
                                value={status}
                                type="text"
                                required
                            >
                            </Input>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit">{initialData ? 'Save data' : 'Add Elve'}</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}