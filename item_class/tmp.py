from subprocess import call;

for i in range(10,45):
    call(['mv','class'+str(i)+'.json','class'+str(i)+'.v1.json']);
