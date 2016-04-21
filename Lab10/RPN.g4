grammar RPN;
    
@header {
    import java.util.*;
}
    
 
@members {
  int a = 0;
  int b = 0;
  int c = 0;
  int val = 0;
  boolean bolval = false;
  boolean y,z;
  Stack<Integer> temp_stack = new Stack<Integer>();
  Stack<Boolean> boo_stack = new Stack<Boolean>();
}
     
start
     : (expr ';' { System.out.println(val); val = 0; System.out.println(bolval); bolval = false;} )+
     ;
     
expr
   : (INT {temp_stack.push($INT.int);}
     |'+' {val = temp_stack.pop() + temp_stack.pop();
        temp_stack.push(val);
     }
     | '*' {
            val = temp_stack.pop() * temp_stack.pop();
            temp_stack.push(val);
     } 
     | '-' {
            val = -(temp_stack.pop()) + temp_stack.pop();
            temp_stack.push(val);
     }
     | '/' {
            b = temp_stack.pop();
            a = temp_stack.pop();
            val = a / b;
            temp_stack.push(val);
     }
     | '%' {
            b = temp_stack.pop();
            a = temp_stack.pop();
            val = a % b;
            temp_stack.push(val);
     }
     | '<' {
            b = temp_stack.pop();
            a = temp_stack.pop();
            
            if(b < a){
                bolval = true;
                boo_stack.push(true);
            }
            else {
                bolval = false;
                boo_stack.push(false);
            }
     }
     | '>' {
            b = temp_stack.pop();
            a = temp_stack.pop();
            
            if(b > a){
                bolval = true;
                boo_stack.push(true);
            }
            else {
                bolval = false;
                boo_stack.push(false);
            }
     }
     | '<' {
            b = temp_stack.pop();
            a = temp_stack.pop();
            
            if(b < a){
                bolval = true;
                boo_stack.push(true);
            }
            else {
                boo_stack.push(false);
            }
     }
     | '<=' {
            b = temp_stack.pop();
            a = temp_stack.pop();
            
            if(b <= a){
                bolval = true;
                boo_stack.push(true);
            }
            else {
                boo_stack.push(false);
            }
     }
     | '>=' {
            b = temp_stack.pop();
            a = temp_stack.pop();
            
            if(b >= a){
                bolval = true;
                boo_stack.push(true);
            }
            else {
                bolval = false;
                boo_stack.push(false);
            }
     }
     | '==' {
            b = temp_stack.pop();
            a = temp_stack.pop();
            
            if(b == a){
                bolval = true;
                boo_stack.push(true);
            }
            else {
                boo_stack.push(false);
            }
     }
     | '!=' {
            b = temp_stack.pop();
            a = temp_stack.pop();
            
            if(b != a){
                bolval = true;
                boo_stack.push(true);
            }
            else {
                bolval = false;
                boo_stack.push(false);
            }
     }
     | '&&' {
            y = boo_stack.pop();
            z = boo_stack.pop();
            
            if(y && z){
                bolval = true;
                boo_stack.push(true);
            }
            else {
                bolval = false;
                boo_stack.push(false);
            }
     }
     | '||' {
            y = boo_stack.pop();
            z = boo_stack.pop();
            
            if(y || z){
                bolval = true;
                boo_stack.push(true);
            }
            else {
                bolval = false;
                boo_stack.push(false);
            }
     }
     | '!' {
            bolval = !(boo_stack.pop());
            boo_stack.push(bolval);
     }
     | 'true' {
            boo_stack.push(true);
     }
     | 'false' {
            boo_stack.push(false);
     })+;
     

INT : [0-9]+  ;
WS : [ \r\t\n]+ -> skip ;
