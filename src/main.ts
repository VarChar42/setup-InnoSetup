import * as core from '@actions/core'
import * as tc from '@actions/tool-cache'

async function run(): Promise<void> {
  try {

    let installDir = tc.find('ISCC.exe', 'latest');

    if (!installDir) {

      core.info('Downloading ...');
      let archivePath = await tc.downloadTool("https://github.com/VarChar42/setup-InnoSetup/raw/main/bin/setup.zip");

      core.info('Extracting ...');
      let extractDir = await tc.extractZip(archivePath, 'innosetup');


      core.info('Adding to the cache ...');
      installDir = await tc.cacheDir(extractDir, 'ISCC.exe', 'latest', 'x64');
    }

    core.addPath(installDir);



  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
