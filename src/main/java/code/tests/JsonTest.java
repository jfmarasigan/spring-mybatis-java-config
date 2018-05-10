package code.tests;

import java.util.Iterator;
import java.util.Map.Entry;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.node.JsonNodeFactory;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class JsonTest {

	public static void main(String[] args) {
		ObjectNode root = JsonNodeFactory.instance.objectNode();
		
		root.put("item1", 1);
		root.put("item2", 2);
		root.put("item3", 3);
		root.put("item4", 4);
		root.put("item5", 5);
		
		Iterator<Entry<String, JsonNode>> iterator = root.fields();
		while (iterator.hasNext()) {
			Entry<String, JsonNode> prop = iterator.next();
			System.out.println(prop.getKey() + " " + prop.getValue());
		}		
		
	}

}
