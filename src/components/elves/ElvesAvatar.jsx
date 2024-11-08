import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const ElvesAvatar = ({ initials }) => {
  const avatars = [
    "https://www.svgrepo.com/show/396366/elf-dark-skin-tone.svg",
    "https://www.svgrepo.com/show/396367/elf-light-skin-tone.svg",
    "https://www.svgrepo.com/show/396368/elf-medium-dark-skin-tone.svg",
    "https://www.svgrepo.com/show/405285/elf-medium-light-skin-tone.svg",
  ];

  function selectRandomAvatar() {
    const randomIndex = Math.floor(Math.random() * avatars.length);
    return avatars[randomIndex];
  }

  return (
    <Avatar>
      <AvatarImage src={selectRandomAvatar()} alt="Elve Avatar" />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  );
};
