import { copyFile, existsSync} from 'fs';
import { join } from 'path'

export const configureEnv = function() {
    var envDir = join(__dirname, '/../../.env')
    var envExampleDir = join(__dirname, '/../../.env.example')

    if(process.env.NODE_ENV === 'test' || process.env.NODE_ENV === 'dev') {
        if (!existsSync(envDir)) {
            copyFile(envExampleDir, '.env', () => {
              if(existsSync(envDir)) {
                  console.log("Env file coppied!")
              }
            });
          }
    } 
}