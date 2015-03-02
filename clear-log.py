import os
import os.path
toppath = '/app'
for f in os.listdir(toppath):
    fpath = os.path.join(toppath, os.path.basename(f))
    if os.path.isdir(fpath):
        logdir = os.path.join(fpath, 'tomcat', 'logs')
        if os.path.exists(logdir):
            for _f in os.listdir(logdir):
                basename = os.path.basename(_f)
                fullpath = os.path.join(logdir, basename)
                if basename == 'catalina.out':
                    print('execute echo "" > ' + fullpath)
                    os.system('echo "" > ' + fullpath) # echo '' > catalina.out
                else:
                    print('execute rm ' + fullpath)
                    os.remove(fullpath)
        else:
            print(logdir + ' is not exists')
    else:
        print(fpath + ' is not a dir')
