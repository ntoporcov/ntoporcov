<?php

$command = $_POST['command'];
$location = $_POST['location'];

$response = [
    'command'       => $command,
    'location'      => $location,
    'msg'           => $message,
];


include 'resume.php';


switch (count($location)){
    case 1:
        $currentLocation = $resume[$location[0]];
        break;
    case 2:
        $currentLocation = $resume[$location[0]] [$location[1]];
        break;
    case 3:
        $currentLocation = $resume[$location[0]] [$location[1]] [$location[2]];
        break;
    case 4:
        $currentLocation = $resume[$location[0]] [$location[1]] [$location[2]] [$location[3]];
        break;
    case 5:
        $currentLocation = $resume[$location[0]] [$location[1]] [$location[2]] [$location[3]] [$location[4]];
        break;
    case 6:
        $currentLocation = $resume[$location[0]] [$location[1]] [$location[2]] [$location[3]] [$location[4]] [$location[5]];
        break;
}

switch ($command[0]){


    // show all folders and files in the current directory
    case 'ls':
        $response['msg'] = implode('&nbsp;&nbsp;&nbsp;',array_keys($currentLocation));
        break;


    // move to directory
    case 'cd':
        if(array_key_exists($command[1],$currentLocation)){

            //checks if argument is file
            if (substr_count($command[1],'.info') > 0){
                $response['msg'] = '-bash: cd: Invalid Command. Command cd can only be used to choose directory to move to.
                Use cat to read .info files';
                break;
            } elseif (substr_count($command[1],'.list') > 0){
                $response['msg'] = '-bash: cd: Invalid Command. Command cd can only be used to choose directory to move to.
                Use cat to read .list files';
                break;
            }else{
                array_push($location,$command[1]);
                $response['location'] = $location;
                break;
            }
        } elseif($command[1] === '../'){
            if(count($location) > 1){
                $removedElement = array_pop($location);
                $response['location'] = $location;
            }else{
                $response['msg'] = '-bash: Currently in root directory.';
            }
        }
        else{
            $response['msg'] = '-bash: Directory '.$command[1].' not found. Run ls to list files in current directory';
        }
        break;

    // show current directory
    case 'pwd':

        $response['msg'] = implode('/',$location);
        break;


    // read file
    case 'cat':

        //checks if command is about a file, not a directory
        if(substr_count($command[1],'.')){

            //checks if file exists
             if(array_key_exists($command[1],$currentLocation)){
                 $value = $currentLocation[$command[1]];

                 if (gettype($value) === 'string'){
                     $response['msg'] =  $command[1].' => '.$value;
                 }elseif(gettype($value) === 'array'){
                     $value = implode('&nbsp;&nbsp;&nbsp;', $value);
                     $response['msg'] =  $command[1].' => '.$value;
                 }
             }else{
                 $response['msg'] = '-bash: File '.$command[1].' not found.';
             }


            //checks if they used -a modifier to read all files in directory
        }else if($command[1]==='-a') {

                $messageLines = [];
                foreach($currentLocation as $key => $value){

                    if(gettype($value)==='string'){
                        array_push( $messageLines,$key.' => '.$value.'<br>');

                    }elseif(gettype($value)==='array'){

                        if(substr_count($key,'.') > 0){
                            $value = implode('&nbsp;&nbsp;&nbsp;',$value);
                            array_push( $messageLines,$key.' => '.$value.'<br>');
                        }
                    }
                }

                if(count($messageLines) > 0){
                    $response['msg'] = implode($messageLines);
                }else{
                    $response['msg'] = '-bash: No readable files found in current directory: '.implode('/',$location);
                }


            // if argument is a directory
        }else{
                $response['msg'] = '-bash: File '.$command[1].' is a directory. It can not be read. Run cd to change directories, or cat -a to read all files in a directory';
        }
        break;

    case 'color':
        $response['msg'] = $command[1];
        break;

    case'run':
        if($command[1] === 'snippets'){
            $response['msg'] = $command[1];
        }
        break;

    case '-help':
        $response['msg'] =
            '<br><strong>COMMANDS AVAILABLE</strong><br><br>
             ls => Lists all files and directories in current location<br>
             pwd => Shows path of current directory<br>
             cd [dir] => Changes directory to [dir]<br>
             cd ../ => Goes back to the previous directory<br>
             cat [file.ext] => Reads content of file. Explicit file extension is required.<br>
             cat -a => Reads all contents of all readable files in current directory<br>
             color [css] =>  Changes color of text in terminal. Accepts CSS colors and hex colors.<br>
             -help => shows help dialogue<br><br>';
        break;

    default:
        $response['msg'] = '-bash: '.$command[0].': Command not found. Run -help to see a list of commands';
};




echo json_encode($response);