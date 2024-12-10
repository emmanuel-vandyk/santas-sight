import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PropTypes from 'prop-types';
import elf from "@/assets/elf-1.webp"
import elf2 from "@/assets/elf-2.webp"
import elf3 from "@/assets/elf-3.webp"

  const avatars = [
    elf,
    elf2,
    elf3,
  ];

  export default function ElvesAvatar({ id, initials }) {
    const [avatarId, setAvatarId] = useState(null)
  
    useEffect(() => {
      const randomId = parseInt(id, 36) % avatars.length
      setAvatarId(randomId)
    }, [id])
  
    const avatarSrc = avatarId !== null ? avatars[avatarId] : undefined
  
    return (
      <Avatar>
        <AvatarImage src={avatarSrc} alt="Elf Avatar" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
    )
  }

  ElvesAvatar.propTypes = {
    id: PropTypes.number.isRequired,
    initials: PropTypes.string.isRequired,

  };