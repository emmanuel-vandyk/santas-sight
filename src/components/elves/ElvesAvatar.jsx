import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import PropTypes from 'prop-types';

  const avatars = [
    "https://www.svgrepo.com/show/396366/elf-dark-skin-tone.svg",
    "https://www.svgrepo.com/show/396367/elf-light-skin-tone.svg",
    "https://www.svgrepo.com/show/396368/elf-medium-dark-skin-tone.svg",
    "https://www.svgrepo.com/show/405285/elf-medium-light-skin-tone.svg",
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
    id: PropTypes.string.isRequired,
    initials: PropTypes.string.isRequired,

  };