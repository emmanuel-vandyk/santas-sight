import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import horns from "@/assets/horns.png";
import propTypes from "prop-types";
import { Meteors } from "@/components/ui/meteors";

export const PlayerModal = ({ isOpen, onClose, player }) => {
    if (!player) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-transparent backdrop-blur-md md:my-10 max-w-4xl h-auto">
                <DialogHeader className="mb-8">
                    <DialogTitle className="text-center text-4xl">
                        <span className="text-red-500">{player.name}</span> <span className="text-white">- {player.role}</span>
                    </DialogTitle>
                </DialogHeader>
                <div className="flex flex-col items-center w-full">
                    <div className="relative w-48 h-48">
                        <div className="flex justify-center">
                            <Meteors number={10} />
                        </div>
                        <Avatar className="w-full h-full">
                            <AvatarImage src={player.image} alt={`${player.name}'s photo`} />
                            <AvatarFallback>{player.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="absolute -top-9 left-36 transform -translate-x-1/2 w-28 z-20">
                            <img src={horns} alt="horns" className="filter-red" />
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="flex justify-center space-x-6 my-2">
                            <a href={player.github} target="_blank" rel="noopener noreferrer">
                                <img
                                    src="https://img.icons8.com/ios-glyphs/40/ffffff/github.png"
                                    alt="GitHub"
                                    className="hover:scale-110"
                                />
                            </a>
                            <a
                                href={player.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <img
                                    src="https://img.icons8.com/ios-glyphs/40/ffffff/linkedin.png"
                                    alt="LinkedIn"
                                    className="hover:scale-110"
                                />
                            </a>
                        </div>
                        <p className="mt-4 text-lg text-green-600 italic font-bold">
                            {`"${player.message}"`}
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

PlayerModal.propTypes = {
    isOpen: propTypes.bool,
    onClose: propTypes.func,
    player: propTypes.object,
};
