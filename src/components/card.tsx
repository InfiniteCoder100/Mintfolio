import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";

interface NFTCardProps {
  image: string;
  tag: string;
  title: string;
  onClick: any;
}

export default function NFTCard(props: NFTCardProps) {
  return (
    <Center py={12}>
      <Box
        role={"group"}
        p={6}
        maxW={"330px"}
        w={"full"}
        bg={"#fefefe40"}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
        zIndex={1}
      >
        <Box
          rounded={"lg"}
          mt={-12}
          pos={"relative"}
          height={"230px"}
          _after={{
            transition: "all .3s ease",
            content: '""',
            w: "full",
            h: "full",
            pos: "absolute",
            top: 5,
            left: 0,
            backgroundImage: `url(${props.image})`,
            filter: "blur(15px)",
            zIndex: -1,
          }}
          _groupHover={{
            _after: {
              filter: "blur(20px)",
            },
          }}
        >
          <Image
            rounded={"lg"}
            height={230}
            width={282}
            objectFit={"cover"}
            src={props.image}
            alt="NFT Image"
          />
        </Box>
        <Stack pt={10} align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            {props.tag}
          </Text>
          <Heading
            fontSize={"2xl"}
            color={"#732fff"}
            fontFamily={"body"}
            fontWeight={500}
          >
            {props.title}
          </Heading>
          <Stack direction={"row"} align={"center"}>
            <Button
              bg={"#c3a6ff80"}
              color={"gray.700"}
              border={3}
              borderColor={"gray.500"}
              borderRadius={"lg"}
              shadow={"2xl"}
              _hover={{
                bg: "#c3a6ff",
                opacity: 10,
              }}
              onClick={props.onClick}
            >
              Mint
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Center>
  );
}
