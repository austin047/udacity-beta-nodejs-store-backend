import { copyFile, existsSync} from 'fs';
import { join } from 'path'

export const configureEnv = function() {
    var envDir = join(__dirname, '/../../.env')
    var envExampleDir = join(__dirname, '/../../.env.example')
    if (!existsSync(envDir)) {
      copyFile(envExampleDir, '.env', () => {
        if(existsSync(envDir)) {
            console.log("Env file coppied!")
        }
      });
    }
}