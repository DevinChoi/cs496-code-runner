import { WebSocketGateway, SubscribeMessage, MessageBody, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect, ConnectedSocket } from '@nestjs/websockets';
import { RunService } from './run.service';
import { GiveCodeState } from './dto/give-code-state';
import { GetCodeState } from './dto/get-code-state';
import { Server } from 'socket.io';
import { Socket } from 'dgram';
import { CodeService } from 'src/code/code.service';

@WebSocketGateway(80, { cors: true })
export class RunGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect{
  constructor(
    private readonly runService: RunService,
    private readonly codeService: CodeService
    ) {}

  
  @WebSocketServer() public server : Server 
  afterInit(server: Server) {
    console.log("init");
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    console.log("connected success");
    this.server.emit('connected success', '연결 성공');
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    console.log("Disconnected success", "연결 종료");    
  }
  
  // 이제 시작

  @SubscribeMessage('code_state')
  uodatecodestate(@ConnectedSocket() socket: Socket, @MessageBody() getcodestate: GetCodeState) {
    /*state 계산*/ 
    //var code = 받아와야 한다.
    var code = getcodestate.code;
    const origin_codes = code.split('\n');

    const new_code = getcodestate.code.split('\n');
    var state = 0;
    var check = false;
    for(var i = 0; i < new_code.length; i++){
      if(origin_codes[i] ==  new_code[i]) { state++; }
      else { break; }
    }
    state = Math.trunc(state/origin_codes.length * 10);

    if(getcodestate.code.charAt(getcodestate.code.length-1) == code.charAt(getcodestate.code.length-1)){
      check = true;
    }
    var givecodestate = new GiveCodeState();
    givecodestate.state = state;
    givecodestate.check = check;
    socket.emit('code_state', givecodestate);
    console.log(givecodestate);
  }

  @SubscribeMessage('code')
  givecode(@MessageBody() level: string, socket : Socket){
    socket.emit('code', this.codeService.findRandomOne(level));
  }
  

}