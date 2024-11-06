import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
                    <div className="flex flex-col space-y-4 py-4">
                        <div className="flex flex-row items-center space-x-4">
                            <Label htmlFor="email" className="text-right">
                                Emails
                            </Label>
                            <Input
                                id="email"
                                name="email"
                                value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                className="flex-grow"
                                required
                            />
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <Label htmlFor="amount" className="text-right">
                                Amount
                            </Label>
                            <Input
                                id="amount"
                                name="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="flex-grow"
                                required
                            />
                        </div>
                        <div className="flex flex-row items-center space-x-4">
                            <Label htmlFor="status" className="text-right">
                                Status
                            </Label>
                            <Input
                                onChange={(e) => setStatus(e.target.value)}
                                id="status"
                                name="status"
                                className="flex-grow"
                                value={status}
                                type="text"
                                required
                            />
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

ElveModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    isClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialData: PropTypes.shape({
        amount: PropTypes.number,
        status: PropTypes.string,
        email: PropTypes.string,
    }),
}

