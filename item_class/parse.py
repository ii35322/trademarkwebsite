import io;

keyword_set = set();
with open('filter_keyword') as fr:
	for line in fr:
		keyword=line.strip();
		keyword_set.add(keyword);

split_word = '';
with open('split_word') as fr:
	for line in fr:
		split_word=line.strip();

firstTime=True;
with open('class32.json','w') as fw:
	fw.write('{\n');
	fw.write('"class32" : [\n');
	with open('class32') as fr:
		for i, line in enumerate(fr):
			if all( keyword not in line for keyword in keyword_set) and len(line) > 2 :
				if '@' in line:
					if not firstTime:
						fw.write("]},\n");
					fw.write('{"'+line.strip()+'" : [');
					firstTime = False;
				elif split_word in line:
					for word in line.strip().split(split_word):
						fw.write('"'+word+'",');
		fw.write("]}\n");
	fw.write(']\n');
	fw.write('}\n');
