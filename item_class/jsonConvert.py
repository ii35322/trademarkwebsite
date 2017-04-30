import json
import sys
import io
import codecs

for f in ['class0'+str(i) for i in range(1,10)]+['class'+str(i) for i in range(10,46)]:
    with open(f+'.v1.json') as fpr, codecs.open(f+'.v2.json','w','utf-8') as fpw:
        print(f);
        obj = json.load(fpr);
        fpw.write('{');
        for root, subclass_list in obj.items():
            fpw.write('"'+root+'":[');
            for i, subclass in enumerate(subclass_list):
                fpw.write('{');
                for subclass_name, item_list in subclass.items():
                    
                    fpw.write('"name":');
                    fpw.write('"'+subclass_name+'",');
                    fpw.write('"items":');
                    fpw.write('[');
                    for j, item in enumerate(item_list):
                        if j != len(item_list)-1:
                            fpw.write('"'+item+'",');
                        else:
                            fpw.write('"'+item+'"');
                    fpw.write(']');
                if i != len(subclass_list)-1:
                    fpw.write('},');
                else:
                    fpw.write('}');
            fpw.write(']');
        fpw.write('}');
