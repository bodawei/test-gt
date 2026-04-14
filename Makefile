BINARY = WebServer.exe
SOURCE = WebServer.cs

all: $(BINARY)

$(BINARY): $(SOURCE)
	mcs -out:$(BINARY) $(SOURCE)

run: $(BINARY)
	mono $(BINARY)

clean:
	rm -f $(BINARY)

.PHONY: all run clean
