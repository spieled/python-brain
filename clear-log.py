import os
import os.path
toppath = '/app'
print('is going to list /app')
for f in os.listdir(toppath):
    print(f)
    fpath = os.path.join(toppath, os.path.basename(f))
    print(fpath)
    if os.path.isdir(fpath):
        logdir = os.path.join(fpath, 'tomcat', 'logs')
        print(logdir)
        if os.path.exists(logdir):
            print(' actually exists')
            for _f in os.listdir(logdir):
                basename = os.path.basename(_f)
                print('basename is ', basename)
                if basename == 'catalina.out':
                    print('actually got you -- catalina.out, execute echo "" > ' + os.path.abspath(_f))
                    os.system('echo "" > ' + os.path.join(logdir, basename)) # echo '' > catalina.out
                else:
                    print('haha , you will be deleted')
                    os.remove(os.path.join(logdir, basename))
        else:
            print(' not exists')
    else:
        print(fpath, ' is not a dir')
