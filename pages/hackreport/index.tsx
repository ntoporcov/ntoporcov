import MainCol from "../../components/MainCol";
import {Divider, Heading, Text, VStack} from "@chakra-ui/react";
import SendGifSection from "../../components/home/SendGifSection";


const Index = () => {
 return (
   <>
     <MainCol>
       <Heading mt={5}>
         Hack Report Privacy & Contact
       </Heading>
       <VStack>
         <Text>
           This privacy policy will explain how my app, Hack Report, uses the personal data (none) we collect from you when you use our website.
         </Text>
         <Text>
           We don't collect any personal data from you. We don't use cookies or any other tracking technology. We don't store any data on our servers. We don't have any servers.
         </Text>
         <Text>
           We don't share your data with any third party. We don't have any data to share.
         </Text>
         <Text>
           We don't delete any data. We don't have any data to delete.
         </Text>
         <Text>
           We don't have any data.
         </Text>
         <Text>
           You can contact me by sending me a gif below. Make sure to include your email address in the message if you want me to respond.
         </Text>
       </VStack>
       <Divider my={5}/>
     <SendGifSection/>
     </MainCol>
   </>
   );
};

export default Index
